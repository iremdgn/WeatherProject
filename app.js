const express = require('express');
const app = express();

const https = require('https');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));




app.get("/", function (req, res) {

    res.sendFile(__dirname + '/index.html');

});

app.post("/", function (req, res) {

    const query = req.body.cityName;
    const apiKey = "b6f91c9de6345f9f3ccacb9da133a6a4";
    const unit = "metric";

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function (response) {
        
        console.log(response.statusCode);

        response.on("data", function (data) {

            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp;
            console.log(temp);

            const description = weatherData.weather[0].description;
            console.log(description);

            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("<h1>The temperature " + query + " is " + temp + " degrees Celcius </h1>");
            res.write("<p>The weather is currently " + description + ".</p>");
            res.write("<img src=" + imageUrl + ">");
            res.send();
        });
    });

});

app.listen(3000, function () {
    console.log("server started on port 3000");
});