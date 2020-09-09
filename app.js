window.addEventListener('load', () => {
    let long;
    let lat;
    let key = "3a5aa2d3093e65";
    let weatherKey = "387a045260f8855f8136c665d33b67e1"

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            let queryURL = `https://us1.locationiq.com/v1/reverse.php?key=${key}&lat=${lat}&lon=${long}&format=json`;

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                let city = response.address.city;
                let state = response.address.state;
                console.log(city, state);
                let weatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${city},${state}&APPID=${weatherKey}`;
                $.ajax({
                    url: weatherURL,
                    method: "GET"
                }).then(function (weatherResponse) {
                    let temp = weatherResponse.main.temp;
                    console.log(temp,weatherResponse);
                    let fahrenheit = (temp - 273.15) * 1.80 + 32;
                    let celcius = temp - 273.15;
                    let weatherIconId = weatherResponse.weather[0].icon;
                    let description = weatherResponse.weather[0].description;
                    console.log(weatherIconId);
                    $("#place").html(city + ", " + state);
                    $("#temp").html(Math.round(fahrenheit));
                    $("#icon").attr("src","http://openweathermap.org/img/wn/" + weatherIconId + "@2x.png")
                    $(".temp-description").html(description);
                })
            })
        })
    } else {
        h1.textContent = "You did now allow your location to be tracked :("
    }



})