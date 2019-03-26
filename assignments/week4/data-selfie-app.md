# Data Selfie App

[Link to deployed app on Heroku](https://data-selfie.herokuapp.com/)

For this week's data selfie app assignment, I decided to build upon Joey's [data selfie app example](https://github.com/joeyklee/data-selfie-app) to add a weather api with reference to Joey's [the weather here](https://github.com/joeyklee/the-weather-here) and create visualizations from the weather data and emotion detection using the [clmtrackr](https://github.com/auduno/clmtrackr) library.

![Gif demoing data selfie app](img/data-selfie-demo.gif)

The general outlook of the index page of the app is the same as that of Joey's example, with exception to the integration of the weather-js api call from the weather here example. I decided to display the weather image and the temperature of the current weather, because those are the two things that most matter to me when I look at the weather on my phone every day (mostly to decide what to wear). 

But once I take the photo, the logged image is not the same as the original camera view. This is done by displaying the video tag view itself inside of the yellow view div, and hiding the canvas element in css. Inside the canvas, it generates random displacement of the pixels of the camera input, based on the temparature of the current weather. By setting "ideal temparature" as 15 degrees, the colder and the warmer it gets from that point, there is more random displacement of pixels. The minimum range of pixel displacement is 2 and maximum is 100. The reason for doing this comes from the fact that the temperature / weather condition effects my body conditions quite a lot and thought it was one of the most important factor in deciding the general feel of the day which I wanted to represent by distorting the seamingly factual state of myself captured via camera.

It also creates sea wave looking colored laters on the bottom of the image using the emotion detection variables from the [clmtrackr](https://github.com/auduno/clmtrackr) library (to represent my "sea of emotions"). There are 6 emotion categories that can be received from the library's tracker (in order of angry, disgusted, fear, sad, surprised, happy), and the emotions are mapped to a hue value in the following range:

* Angry: 0 - 60;
* Disgusted: 60 - 120;
* Fear: 120 - 180;
* Sad: 180 - 240;
* Surprised: 240 - 300;
* Happy: 300 - 360;

![Image of log view of data selfie app](img/data-selfie-logs.jpg)

One technical thing that I had to change in the log system was to have the database items be sorted in reverse chronological order when I called the get method of the api. I noticed that for some reason, when I do a simple api get call, the results end up being shuffled around. Logically I thought that newly created post items would simply get appended at the end of the database, but that wasn't the case. Below is the modification of the code.

```
app.get("/api", (req, res) => {
    db.find({}).sort({created: -1}).exec(function (err, docs) {
        if(err){
            return err;
        }
        res.json(docs);
    });
});

```

## Reflection

Similar to representation of smiliey faces in my last [my data feels](https://github.com/js6450/quantifiedHumanists/blob/master/assignments/week3/my-data-feels.md) assignment, I tried to visualize the similarities and differences through abstraction of the more realistic / factual / concrete data. 

I wasn't able to maintain a consistant log of selfies because during the stage of development, I had been deleting the database file (without thinking too much about my action). In the process of continuing to update the code and with the change of visuals, I had been deleting the db file which consequently meant that I had a very small amount of saved data. Additionally, I wanted to put the application up online and use the online version because I thought it made sense to do that rather than just using a local server on my computer, but I realized not too soon that the database file kept getting reset because the app keeps on getting re-launched and the files being reset when running on the free dyno on Heroku.

I think I had focused too much on adding my touch to the app and focusing less on capturing the data itself. I do want to see what would come out of this if I keep using it to log selfies every day. Since the randomization of pixels depend on the temparature, I think there will be quite a clear transition of visuals as the weather gets warmer (hopefully!). 

On a side note, I was able to use the same code structure (with webRTC & peerjs components) for the Midterm project for [Veillance](https://itp.nyu.edu/classes/v-sp2019/) to capture and save the faces detected inside of the webcam view. The technique of reducing pixel density and saving the image's dataURL inside of a database file seems quite lightweight and applicable in a lot of other general cases.

![Gif demoing dual intentions app](img/dual-intentions-demo.gif)
