import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
import pandas as pd
import numpy as np
import os
from tensorflow.keras.preprocessing.image import load_img, img_to_array
 
# Define CustomDataGenerator
class CustomDataGenerator(tf.keras.utils.Sequence):
    def __init__(self, csv_file, img_dir, batch_size=32, img_size=(128, 128), shuffle=True):
        self.csv_file = csv_file
        self.img_dir = img_dir
        self.batch_size = batch_size
        self.img_size = img_size
        self.shuffle = shuffle
        self.df = pd.read_csv(csv_file)
        self.indices = np.arange(len(self.df))
        self.on_epoch_end()
 
    def __len__(self):
        return len(self.df) // self.batch_size
 
    def __getitem__(self, index):
        indices = self.indices[index * self.batch_size:(index + 1) * self.batch_size]
        batch_filenames = self.df.iloc[indices]['filename'].values
        batch_labels = self.df.iloc[indices]['label'].values
        return self.__data_generation(batch_filenames, batch_labels)
 
    def on_epoch_end(self):
        if self.shuffle:
            np.random.shuffle(self.indices)
 
    def __data_generation(self, batch_filenames, batch_labels):
        images = []
        for filename in batch_filenames:
            img_path = os.path.join(self.img_dir, filename)
            img = load_img(img_path, target_size=self.img_size)
            img = img_to_array(img) / 255.0  # Normalize to [0, 1]
            images.append(img)
        return np.array(images), np.array(batch_labels)
 
# Usage example for CustomDataGenerator
csv_file = './image_labels_1_to_256.csv' 
img_dir = './wrinkles'
batch_size = 32
img_size = (128, 128)
epochs = 10
 
# Initialize the custom data generator
train_generator = CustomDataGenerator(csv_file, img_dir, batch_size=batch_size, img_size=img_size)
 
# Define and compile the model
model = Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(*img_size, 3)),
    MaxPooling2D(pool_size=(2, 2)),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D(pool_size=(2, 2)),
    Flatten(),
    Dense(64, activation='relu'),
    Dense(1, activation='linear')  
])
 
model.compile(optimizer='adam', loss='mse', metrics=['mae'])
 

model.fit(train_generator, epochs=epochs)
 
# Save the model
model.save('models/wrinkle_model_saved', save_format='tf')

# import tensorflow as tf
# from tensorflow.keras.models import Sequential
# from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
# import numpy as np

# # Define your custom data generator function
# def custom_data_generator(batch_size=32, target_size=(128, 128)):
#     while True:
#         batch_images = np.zeros((batch_size, *target_size, 3))
#         batch_labels = np.zeros((batch_size, 1))
        
#         for i in range(batch_size):
            
#             image = np.random.rand(*target_size, 3)  
#             wrinkle_score = np.random.uniform(0.0, 20.0) 
            
#             batch_images[i] = image
#             batch_labels[i] = wrinkle_score
        
#         yield batch_images, batch_labels

# model = Sequential([
#     Conv2D(32, (3, 3), activation='relu', input_shape=(128, 128, 3)),
#     MaxPooling2D(pool_size=(2, 2)),
#     Conv2D(64, (3, 3), activation='relu'),
#     MaxPooling2D(pool_size=(2, 2)),
#     Flatten(),
#     Dense(64, activation='relu'),
#     Dense(1, activation='linear')  
# ])

# model.compile(optimizer='adam', loss='mse', metrics=['mae'])

# batch_size = 32
# steps_per_epoch = 100 

# train_generator = custom_data_generator(batch_size=batch_size)

# model.fit(train_generator, steps_per_epoch=steps_per_epoch, epochs=10)

# model.save('models/wrinkle_model_saved', save_format='tf')



# # import tensorflow as tf
# # from tensorflow.keras.models import Sequential
# # from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
# # from tensorflow.keras.preprocessing.image import ImageDataGenerator

# # model = Sequential([
# #     Conv2D(32, (3, 3), activation='relu', input_shape=(128, 128, 3)),
# #     MaxPooling2D(pool_size=(2, 2)),
# #     Conv2D(64, (3, 3), activation='relu'),
# #     MaxPooling2D(pool_size=(2, 2)),
# #     Flatten(),
# #     Dense(64, activation='relu'),
# #     Dense(1, activation='linear')  # Assuming wrinkle score is a regression output
# # ])
 
# # model.compile(optimizer='adam', loss='mse', metrics=['mae'])
 
# # # Dummy training data generator (replace with actual data)
# # train_datagen = ImageDataGenerator(rescale=1./255)
# # train_generator = train_datagen.flow_from_directory(
# #     'path_to_training_data',  # Replace with actual path
# #     target_size=(128, 128),
# #     batch_size=32,
# #     class_mode='raw'  # Assuming your target labels are continuous values
# # )
 
# # # Train the model (replace steps_per_epoch with appropriate value)
# # model.fit(train_generator, steps_per_epoch=100, epochs=10)
 
# # # Save the model in TensorFlow SavedModel format
# # model.save('models/wrinkle_model_saved', save_format='tf')