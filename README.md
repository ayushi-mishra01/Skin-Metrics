## Description

<!-- A virtual **skincare advisor** that uses **Machine Learning** to analyse user's selfie and offer personalised products **recommendation** based on the skin metrics inferred. -->

Combining the power of analytics and skincare, Skin-Metrics evaluates skin health metrics to help users achieve a natural glow by better understanding their skin needs, while also providing clear insights and personalized recommendations for improvement.

# Models

## Skin Tone

Obtaining skin tone consists of :

- Detecting and extracting skin pixels
- Classifying those color values into the appropriate skin tone class

[This paper](http://www.eleco.org.tr/openconf_2017/modules/request.php?module=oc_proceedings&action=view.php&id=248&file=1/248.pdf&a=Accept+as+Lecture) was followed in extracting the skin pixels. [Skin detection](https://github.com/Randon-Myntra-HackerRamp-21/CV-skin-care-recommendation/blob/main/ML/Skin_metrics/Skin_tone/skin_detection.py) has three major steps i.e.., **initial segmentation, prediction of skin pixels and k-means clustering**.
Initial segmentation is applied with the threshold value &#8594; average of [T<sub>OTSU</sub>](https://learnopencv.com/otsu-thresholding-with-opencv/) and T<sub>MAX</sub>. These values are aquired from the image histogram of the grayscale image

![Image Histogram](https://github.com/Randon-Myntra-HackerRamp-21/CV-skin-care-recommendation/blob/main/images/skin_tone/image_histogram.png)

The thresholded image is then converted to, **HSV** and **YCrCb** color spaces. These colorspaces are less sensitive to light conditions. Potential skin color pixels are selected with :
`(Hue <= 170) and (140 <= Cr <= 170) and (90 <= Cb <= 120)`.
A binary image is formed with the selected pixels.

We defined special dataset made of input features in order to cluster pixels on an image. This dataset contains some components of two color spaces _(Hue, Cr, Cb)_, positions of pixels on the image _(Xp, Yp)_ and rough estimation of skin pixels _(I)_. Since all information is contained in a dataframe, we converted all six aforementioned components _**(Cr, Cb, Hue, Xp, Yp and I)**_ into appropriate vectors.

Image pixels are clustered into three clusters: **background, foreground and skin pixels**. We used square Euclidean measure as a distance. Aproximated skin pixels _(I)_, determine which cluster represents skin.

![Skin_detection](https://github.com/Randon-Myntra-HackerRamp-21/CV-skin-care-recommendation/blob/main/images/skin_tone/skintone_images_fs.png)

The mean color values obtained from the cluster are then used for classifying the tone into [Fitzpatrick scale](https://en.wikipedia.org/wiki/Fitzpatrick_scale) using a **KNN model**. The model was trained using the [color values dataset](https://github.com/Randon-Myntra-HackerRamp-21/CV-skin-care-recommendation/blob/main/ML/Skin_metrics/Skin_tone/public/skin_tone_dataset.csv) gotten from the [image dataset](https://github.com/Randon-Myntra-HackerRamp-21/CV-skin-care-recommendation/tree/main/ML/Skin_metrics/Skin_tone/public/skin%20tone%20values) of [Von Luschan's chromatic scale](https://github.com/Randon-Myntra-HackerRamp-21/CV-skin-care-recommendation/blob/main/ML/Skin_metrics/Skin_tone/public/test%20images/Felix_von_Luschan_Skin_Color_chart.svg.png).

## Skin Type

Facial skin type is inferred by analysing the picture with the utilization of Convolutional Neural Network (CNN) which classifies the image into three classes : _Dry, Oily and Normal_. To increase the accuracy of the model, transfer learning (_EfficientNet B0_) is used with **training accuracy 87.10 %** and **validation accuracy 80%**. The main concern we faced here is the amount of quality face images.
![Basic CNN Architecture](https://miro.medium.com/max/1400/1*ciDgQEjViWLnCbmX-EeSrA.gif)

## Acne concern level

One of the skin metrics, Acne concern level is classified into three classes : _Low, moderate and Severe_. The model structure possess similar architecture to Skin types CNN model with the use of transfer learning which provides us with an **accuracy of approx 68%** over both training and validation image sets. The dataset we used is obtained from Kaggle.

**EfficientNet Architecture** :
![EfficientNet](https://1.bp.blogspot.com/-DjZT_TLYZok/XO3BYqpxCJI/AAAAAAAAEKM/BvV53klXaTUuQHCkOXZZGywRMdU9v9T_wCLcBGAs/s640/image2.png)

**Link to Dataset** : https://www.kaggle.com/rutviklathiyateksun/acne-grading-classificationdataset

## Recommender System

Given the user's skin metrics and concerns, how do we fetch **relevant** skincare products that shall possibly address his/her skin concerns?

Since the dataset that has been used contains data straight from the **Myntra Beauty Section** itself, each product in the dataset is associated with skin tone and one/more skin concerns (acne, blemishes, redness, etc).

A good strategy would be to fetch those products whose product attributes (skin tone + concerns) is **similar** to the user's skin metrics and concerns. Mathematically, this similarity can be quantified in the form of **cosine similarity** between product feature vector and user skin attribute vector.
![enter image description here](https://neo4j.com/docs/graph-data-science/current/_images/cosine-similarity.png)

**The key idea is:** To find **relevant** skincare products from a particular category, given the user's skin features, we simply obtain the top **n** values of **similarity(skin vector, product vector)** for the products in dataset belonging to that said category, and return the products corresponding to those values.

# How to run

Clone this repo, head to the root directory and create a [virtual env](https://www.geeksforgeeks.org/python-virtual-environment/).
`$ pip install -r requirements.txt`

Then,

    $ cd backend
    $ python app.py

After that,

    $ cd frontend
    $ npm install
    $ npm start

To train models,
$ python darkCircle_model.py
$ python eyebag_model.py
$ python pore_model.py
$ python redness.py
$ python save_wrinkle_model.py

The web app can be accessed at [localhost:3000](http://localhost:3000)

## Tech Stack

**Frontend** : React

**Backend** : Flask, OpenCV, Tensorflow
