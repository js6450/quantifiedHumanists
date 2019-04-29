# Emotional Painting

![screen capture of emotional painting](img/emotional-painting.jpg)

[Go to the project website on Heroku](https://emotional-painting.herokuapp.com/) and here is [link to project presentation](https://docs.google.com/presentation/d/1U6HEltr3MK0WNwCqH4WPZQlSYG0CY3DJxNG3z3djHhk/edit?usp=sharing).

Emotional Painting is a data visualization of photos and their captions that I've collected over month of April 2019. I wanted to analyze the moments of my life captured by photos by writing short captions about the photos then visualizing them as paintings by using data of the text sentiment analysis and dominant colors of the photos.

![gif of emotional painting log view and main view](img/emotional-painting-overlay.gif)

The website has three modes of viewing. The landing page first shows a grid of photos and each entry has the caption text with its analysis overlayed on top of the photo. The painting strokes generated based on the text sentiment score and dominant colors start being drawn from where the photo is being displayed.

The log view of the website just shows the photo and its text overlay on the top, without the drawing of the painting strokes.

![gif of emotional painting log view and painting view](img/emotional-painting-only.gif)

The painting view only shows the view of the painting, without the photo and text shown behind the painting in the main view.

![image of emotional painting workflow](img/workflow.jpeg)

I had originally created a diagram of the workflow of the project for my proposal, and I've managed to stick to the original plans of creating a shortcuts app for submitting photo & caption to the server.

![image of shortcuts app view](img/shortcuts-view.jpg)

The technical challenge that I set for myself for this assignment is to use Amazon S3 storage service to store all my images instead of base64 strings as I had previously done either in MongoDB or NeDB. I used [Multer](https://github.com/expressjs/multer) to connect to the S3 bucket that I made for this project for a single image upload. I had some difficulty with combining the api post request for both image file and text at the same time so I decided to pass on the text input for my image captions as a query string.

The server uploads the photo to the Amazon S3 storage service, then stores the link of the image, caption sentence, its text sentiment score, and dominant colors of the image to the mongoDB database entry.

![image of brush stroke legend](img/brush-legand.jpg)

## Reflection

* I think this project will really come to show its meaning when it is done over months to see what the differences are between the paintings. Right now the painting has nothing to compare with and it would be nice to see how it is different from the past months.
