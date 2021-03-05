"use strict";
const buttonsCities = document.querySelectorAll(".btn-cities");
const imgIcons = document.querySelector("#img-icons");
const options = {
  timeOfTheDayNow: "",
};


addWeatherItem(); // створюємо другорядні елементи для показу погоди на наступні години
selectCity("lutsk");


buttonsCities.forEach((cityButton) => {
  cityButton.addEventListener("click", () => selectCity(cityButton.dataset.city));
});


function selectCity(cityName) {
  
 
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=111d8d44f58751fb5cc404f71f53e329`
  )
    .then((res) => res.json())
    .then((res) => {
     
      getDate(res.timezone-7200); // віднімаємо різницю в часовому поясі, аби передати 0-ий часовий пояс
      let weatherDescrip = getWeatherCondition(res.weather[0].description); // отримуємо описання погоди(ясно, дощ і т.д.)
      addImgIcons(options.timeOfTheDayNow, weatherDescrip); // додаємо картинку погоди в карточку.
      
      document.querySelector(".temp").innerText =
        Math.round(res.main.temp - 273) + " °C";
      document.querySelector(".name-city").innerText = res.name;
      document.querySelector(".feels-like").innerText =
        Math.round(res.main.feels_like - 273) + " °C";
      document.querySelector(".humidity").innerText = res.main.humidity + "%";
      
      
    })
    .catch((err)=>alert("Не вдалося отримати дані з сервера"));

    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=111d8d44f58751fb5cc404f71f53e329`
    )
      .then((res) => res.json())
      .then((res) => {
        changeWeatherItem(res);
      })
      .catch(err=>console.log(err))
};




function getDate(timeZone) {
    const d = new Date(+new Date() + +timeZone*1000); // отримуємо дату з урахуванням часового поясу

    options.timeOfTheDayNow = getTimeOfDay(d.getHours());  // отримуєто пору дня(день чи ніч)
    
    const day = ["Неділя","Понеділок","Вівторок","Середа","Четвер","П'ятниця","Субота"];
    const month = ["Січня","Лютого","Березня","Квітня","Травня","Червня","Липня","Серпня","Вересня","Жовтня","Листопада","Грудня"]
    const hours = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours(); 
    const minutes = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
    
    document.querySelector(".date").innerText = 
    `${d.getDate()} ${month[d.getMonth()]}, ${day[d.getDay()]}, ${hours}:${minutes}`; // добавляємо дату в карту погоди

  
};


function getTimeOfDay(timeNow){
  return timeNow>4 && timeNow<19 ? "day" : "night";
};

function getWeatherCondition(weather){
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
    `http://api.openweathermap.org/data/2.5/forecast?q=lutsk&appid=111d8d44f58751fb5cc404f71f53e329`
  )
    .then((res) => res.json())
    .then((res) => {
      for(let i = 0; i<12; i++){
        const div = document.createElement("div");
        div.classList.add("weather-item");

        div.innerHTML =  `
        <div class="time-item">
            <span> ${res.list[i].dt_txt.split(" ")[0]}	</span>
            <span class="hours-item"> ${res.list[i].dt_txt.split(" ")[1].slice(0,-3)} </span>		
        </div>
        <div class="img-item-block">
            <img class="img-item"></img>
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
  for(let i = 0; i<12; i++){
    const timeOfTheDay = getTimeOfDay(new Date(res.list[i].dt_txt).getHours());
    const weatherNow = getWeatherCondition(res.list[i].weather[0].description);

    document.querySelectorAll(".time-item")[i].innerHTML =  `
    <span> ${res.list[i].dt_txt.split(" ")[0]}	</span>
    <span class="hours-item"> ${res.list[i].dt_txt.split(" ")[1].slice(0,-3)} </span> `;

      document.querySelectorAll(".img-item")[i].src = `img/${timeOfTheDay}/icons-${weatherNow}.png`;
    
      document.querySelectorAll(".temp-item")[i].innerHTML = 
        Math.round(res.list[i].main.temp - 273) +" °C";
  }
};
