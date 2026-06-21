function checkWeather() {
    let cityName = document.getElementById("city").value;
    let myApiKey = "9212fe3ab87a4c9abaf45210241802";
    let url = "http://api.weatherapi.com/v1/current.json?key=" + myApiKey + "&q=" + cityName;

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            document.getElementById("showCity").innerHTML = data.location.name;
            document.getElementById("showTemp").innerHTML = data.current.temp_c + "°C";
            document.getElementById("showStatus").innerHTML = data.current.condition.text;

        });

}