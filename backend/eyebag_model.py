import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense
import pandas as pd
import numpy as np
import os
 
# Custom Data Generator
class CustomDataGenerator(tf.keras.utils.Sequence):
    def __init__(self, image_dir, labels_df, batch_size=32, target_size=(224, 224), shuffle=True):
        self.image_dir = image_dir
        self.labels_df = labels_df
        self.batch_size = batch_size
        self.target_size = target_size
        self.shuffle = shuffle
        self.indices = np.arange(len(self.labels_df))
        self.on_epoch_end()
 
    def __len__(self):
        return int(np.floor(len(self.labels_df) / self.batch_size))
 
    def __getitem__(self, index):
        batch_indices = self.indices[index * self.batch_size:(index + 1) * self.batch_size]
        batch_samples = self.labels_df.iloc[batch_indices]
 
        batch_images = np.zeros((self.batch_size, *self.target_size, 3))
        batch_labels = np.zeros((self.batch_size, 1))
 
        for i, (filename, score) in enumerate(zip(batch_samples['filename'], batch_samples['score'])):
            img_path = os.path.join(self.image_dir, filename)
            image = tf.keras.preprocessing.image.load_img(img_path, target_size=self.target_size)
            image = tf.keras.preprocessing.image.img_to_array(image) / 255.0  # Normalize to [0, 1]
 
            batch_images[i] = image
            batch_labels[i] = score
 
        return batch_images, batch_labels
 
    def on_epoch_end(self):
        if self.shuffle:
            np.random.shuffle(self.indices)
 
def main():
    # Paths
    image_dir = 'eye_bags'
    labels_path = 'eye_bags_labelled.csv'
   
    # Load labels
    labels_df = pd.read_csv(labels_path)
 
    # Initialize data generator
    train_generator = CustomDataGenerator(image_dir=image_dir, labels_df=labels_df, batch_size=32, target_size=(224, 224))
 
    # Build model
    model = Sequential([
        Conv2D(32, (3, 3), activation='relu', input_shape=(224, 224, 3)),
        MaxPooling2D(pool_size=(2, 2)),
        Conv2D(64, (3, 3), activation='relu'),
        MaxPooling2D(pool_size=(2, 2)),
        Flatten(),
        Dense(64, activation='relu'),
        Dense(1, activation='linear')
    ])
 
    model.compile(optimizer='adam', loss='mse', metrics=['mae'])
 
    # Train model
    steps_per_epoch = len(train_generator)
    model.fit(train_generator, steps_per_epoch=steps_per_epoch, epochs=10)
 
    # Save model
    model.save('models/eyebags_model', save_format='tf')
 
if __name__ == '__main__':
    main()
 