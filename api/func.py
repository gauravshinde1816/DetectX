from keras.preprocessing import image
import tensorflow as tf
from tensorflow import keras
import numpy as np
from sklearn import preprocessing
from keras.models import load_model
import warnings

def predict_covid(img_path):
  img = image.load_img(img_path, target_size=(100, 100))
  model = load_model("./lp1.h5")
  img_array = image.img_to_array(img)
  img_batch = np.expand_dims(img_array, axis=0)
  prediction = model.predict(img_batch)
  return prediction[0]*100

