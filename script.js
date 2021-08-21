const param = {
    "url": "https://api.openweathermap.org/data/2.5/",
    "appid": "a64987f4e57fd41303c623c06cbcad66"
}
const cities = {
    698740: "Odesa",
    703448: "Kyiv",
    702550: "Lviv",
    706483: "Kharkiv",
    709930: "Dnipro",
    687700: "Zaporizhia",
    691650: "Ternopil",
    707471: "Ivano-Frankivsk",
    696643: "Poltava",
    703845: "Kryvyi Rih",
    689558: "Vinnytsia",
    700568: "Mykolaiv",
}

const cityId = document.querySelector('#city');

function citiesValue() {
    for (let key in cities) {
        let option = document.createElement('option');
        option.value = key;
        option.textContent = cities[key];
        cityId.append(option);
        if (key == 703448) cityId.value = key;
    }
}
citiesValue();


function getWeather() {
    const cityIdValue = cityId.value;
    fetch(`${param.url}weather?id=${cityIdValue}&appid=${param.appid}`)
    .then(weather => {
        return weather.json();
    }).then(showWeather);
}

function showWeather(data) {
    // console.log(data);

    document.querySelector('.city-name').textContent = data.name;
    document.querySelector('.temperature').innerHTML = Math.round(data.main.temp - 273) + '&#176;';
    document.querySelector('.feels-like-temp').innerHTML = `${Math.round(data.main.feels_like - 273)}&#176;`;

    document.querySelector('.weather-icon').innerHTML = `<img class="img-icon" src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
    document.querySelector('.max-temp').textContent = Math.round(data.main.temp_max - 273);
    document.querySelector('.min-temp').innerHTML = Math.round(data.main.temp_min - 273);
    document.querySelector('.main-info').textContent = data.weather[0].description;
    
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%'
    document.querySelector('.wind').innerHTML = data.wind.speed + ' m/s'
    document.querySelector('.pressure').innerHTML = data.main.pressure + ' hPa'
}

getWeather();
cityId.onchange = getWeather;