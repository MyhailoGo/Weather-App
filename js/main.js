"use strict";
const buttonsCities = document.querySelectorAll(".btn-cities");
const imgIcons = document.querySelector("#img-icons");
const options = {
  timeOfTheDayNow: "",
};


addWeatherItem();
selectCity("lutsk");


buttonsCities.forEach((cityButton) => {
  cityButton.addEventListener("click", () => selectCity(cityButton.dataset.city));
});


function selectCity(cityName) {
  
  getTimeOfDay(new Date().getHours());
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=111d8d44f58751fb5cc404f71f53e329`
  )
    .then((res) => res.json())
    .then((res) => {
     
      getDate((res.timezone-7200)/3600);
      let weatherDescrip = weatherCondition(res.weather[0].description);
      addImgIcons(options.timeOfTheDayNow,weatherDescrip);
      
      document.querySelector(".temp").innerText =
        Math.round(res.main.temp - 273) + " °C";
      document.querySelector(".name-city").innerText = res.name;
      document.querySelector(".feels-like").innerText =
        Math.round(res.main.feels_like - 273) + " °C";
      document.querySelector(".humidity").innerText = res.main.humidity + "%";
      
      
    })
    .catch((err)=>alert("Не вдалося отримати дані з сервера"));

    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=111d8d44f58751fb5cc404f71f53e329&lang=uk`
    )
      .then((res) => res.json())
      .then((res) => {
        changeWeatherItem(res);
      })
      .catch(err=>console.log(err))
};




function getDate(timeZone) {
    const d = new Date(+new Date() + +timeZone*3600000);

    const day = ["Неділя","Понеділок","Вівторок","Середа","Четвер","П'ятниця","Субота"];
    const month = ["Січня","Лютого","Березня","Квітня","Травня","Червня","Липня","Серпня","Вересня","Жовтня","Листопада","Грудня"]
    const hours = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours(); 
    const minutes = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
    
    document.querySelector(".date").innerText = 
    `${d.getDate()} ${month[d.getMonth()]}, ${day[d.getDay()]}, ${hours}:${minutes}`;

  
};


function getTimeOfDay(timeNow){
    timeNow>4 && timeNow<19 ? options.timeOfTheDayNow ="day" : options.timeOfTheDayNow ="night";
};

function weatherCondition(weather){
    let weatherNow = "";
    switch(weather){
      case "clear sky": weatherNow = "clear";
      break;

      case "broken clouds": weatherNow = "cloudy";
      break;

      case "few clouds": weatherNow = "cloudy";
      break;
      
      case "scattered clouds": weatherNow = "cloudy-2";
      break;
      
      case "overcast clouds": weatherNow = "cloudy-3";
      break;

      case "snow": weatherNow = "snowy";
      break;

      case "light snow": weatherNow = "snowy";
      break;

      case "light rain": weatherNow = "rainy";
      break;

      case "moderate rain": weatherNow = "rainy-2";
      break;

      case "mist": weatherNow = "cloudy-3";
      break;
      
      default: weatherNow = "clear";
  }

  return weatherNow;
};

function addImgIcons(timeOfTheDay,weatherNow){
    imgIcons.src = `img/${timeOfTheDay}/icons-${weatherNow}.png`
};


function addWeatherItem(){
  fetch(
    `http://api.openweathermap.org/data/2.5/forecast?q=lutsk&appid=111d8d44f58751fb5cc404f71f53e329&lang=uk`
  )
    .then((res) => res.json())
    .then((res) => {
      for(let i = 0; i<9; i++){
        const div = document.createElement("div");
        div.classList.add("weather-item");

        div.innerHTML =  `
        <div class="time-item">
            ${res.list[i].dt_txt.split(" ")[0]}	
            ${res.list[i].dt_txt.split(" ")[1].slice(0,-3)}		
        </div>
        <div class="temp-item">
            ${Math.round(res.list[i].main.temp - 273) +" °C"}
        </div>
        `;
        document.querySelector(".weather-list").append(div);
      }
    })
}

function changeWeatherItem(res){
  for(let i = 0; i<9; i++){
    document.querySelectorAll(".time-item")[i].innerHTML =  `
      ${res.list[i].dt_txt.split(" ")[0]}	
      ${res.list[i].dt_txt.split(" ")[1].slice(0,-3)}`;
    
      document.querySelectorAll(".temp-item")[i].innerHTML = 
        Math.round(res.list[i].main.temp - 273) +" °C";
  }
};
