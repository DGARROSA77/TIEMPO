const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutPut = document.querySelector('.date');
const timeOutPut = document.querySelector('.time');
const conditionOutPut = document.querySelector('.condition');
const nameOutPut = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutPut = document.querySelector('.cloud');
const humidityOutPut = document.querySelector('.humidity');
const windOutPut = document.querySelector('.wind');
const form = document.getElementById("locationInput");
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');


//Default city when the page Loads
let cityInput = "Madrid";

//Add click event to each city in the panel
cities.forEach((city) => {
    city.addEventListener('click', (e) => {
        //Changes from default city to the clicked one
        cityInput = e.target.innerHTML;
        //Function that fetches and displays all the data from the weather API 
        fetchWeatherData();
        //Fade out the app
        app.style.opacity = '0';

    });
})

//Add submit event to the form
form.addEventListener('submit', (e) => {
    if (search.value.length == 0) {
        alert('Please type in a city name')
    } else {
        cityInput = search.value;
        fetchWeatherData();
        search.value = "";
        app.style.opacity = "0";
    }

    e.preventDefault();
});

// function dayOfTheWeek(day, month, year) {
//     const weekday = [
//         "Sunday",
//         "Monday",
//         "Tuesday",
//         "Wednesday",
//         "Thursday",
//         "Friday",
//         "Saturday"
//     ];
//     return weekday[new Date(`${day}/${month}/${year}`).getDay()];
// };


//Function that fetches and displays the data from the weather API
function fetchWeatherData() {
    fetch(`https://api.weatherapi.com/v1/current.json?key=347d1a86162a4cdc87f110353221403&q=${cityInput}`)

        .then(response => response.json())
        .then(data => {
            console.log(data);

            temp.innerHTML = data.current.temp_c + "&#176;";
            conditionOutPut.innerHTML = data.current.condition.text;

            const date = data.location.localtime;
            const y = parseInt(date.substr(0, 4));
            const m = parseInt(date.substr(5, 2));
            const d = parseInt(date.substr(8, 2));
            const time = date.substr(11, 5);

            dateOutPut.innerHTML = `${d}, ${m} ${y}`;
            timeOutPut.innerHTML = time;
            nameOutPut.innerHTML = data.location.name;

            const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
            icon.src = "./Assets/Icons/" + iconId;


            cloudOutPut.innerHTML = data.current.cloud + "%";
            humidityOutPut.innerHTML = data.current.humidity + "%";
            windOutPut.innerHTML = data.current.wind_kph + "km/h";

            let timeOfDay = "day";
            const code = data.current.condition.code;

            if (!data.current.is_day) {
                timeOfDay = "night";
            }

            if (code == 1000) {
                app.style.backgroundImage = `url(./Assets/img/${timeOfDay}/sol.jpg)`;
                btn.style.background = "#e5ba92";
                if (timeOfDay == "night") {
                    btn.style.background = "#181e27";
                    app.style.backgroundImage = `url(./Assets/img/${timeOfDay}/despejado.jpg)`;
                }
            }

            else if (
                code == 1003 ||
                code == 1006 ||
                code == 1009 ||
                code == 1030 ||
                code == 1069 ||
                code == 1087 ||
                code == 1135 ||
                code == 1273 ||
                code == 1276 ||
                code == 1279 ||
                code == 1282
            ) {
                app.style.backgroundImage = `url(./Assets/img/${timeOfDay}/nublado.jpg)`;
                btn.style.background = "#fa6d1b";
                if (timeOfDay == "night") {
                    btn.style.background = "#181e27";
                    app.style.backgroundImage = `url(./Assets/img/${timeOfDay}/nubes.jpg)`;
                }
            } else if (
                code == 1063 ||
                code == 1069 ||
                code == 1072 ||
                code == 1150 ||
                code == 1153 ||
                code == 1180 ||
                code == 1183 ||
                code == 1186 ||
                code == 1189 ||
                code == 1192 ||
                code == 1195 ||
                code == 1204 ||
                code == 1207 ||
                code == 1240 ||
                code == 1243 ||
                code == 1246 ||
                code == 1249 ||
                code == 1252
            ) {
                app.style.backgroundImage = `url(./Assets/img/${timeOfDay}/lluvioso.jpg)`;
                btn.style.background = "#647d75";
                if (timeOfDay == "night") {
                    btn.style.background = "#325c80";
                    app.style.backgroundImage = `url(./Assets/img/${timeOfDay}/lluvia.jpg)`;
                }
            } else {
                app.style.backgroundImage = `url(./Assets/img/${timeOfDay}/nieve.jpg)`;
                btn.style.background = "#4d72aa";
                if (timeOfDay == "night") {
                    btn.style.background = "#1b1b1b";
                    app.style.backgroundImage = `url(./Assets/img/${timeOfDay}/despejado.jpg)`;
                }
            }

            app.style.opacity = "1";

        })

        .catch(() => {
            alert('city not found, please try again');
            app.style.opacity = "1";
        });

}

fetchWeatherData();

app.style.opacity = "1";