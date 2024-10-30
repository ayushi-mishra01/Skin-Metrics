import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
import pandas as pd
import numpy as np
import os
from tensorflow.keras.preprocessing.image import load_img, img_to_array

class CustomDataGenerator(tf.keras.utils.Sequence):
    def __init__(self, csv_file, img_dir, batch_size=22, img_size=(128, 128), shuffle=True):
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
            img = img_to_array(img) / 255.0
            images.append(img)
        return np.array(images), np.array(batch_labels)

csv_file = './pores_labelled.csv'
img_dir = './pores'
batch_size = 22
img_size = (128, 128)
epochs = 10

train_generator = CustomDataGenerator(csv_file, img_dir, batch_size=batch_size, img_size=img_size)

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

model.save('models/pore_model_saved', save_format='tf')