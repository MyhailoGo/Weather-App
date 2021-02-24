const buttonsCities = document.querySelectorAll(".btn-cities");
const imgIcons = document.querySelector("#img-icons");
const options = {
  timeOfTheDayNow: "",
}



selectCity("lutsk");

buttonsCities.forEach((cityButton) => {
  cityButton.addEventListener("click", () => {
    selectCity(cityButton.dataset.city)
  }
  );
});


 function selectCity(cityName) {
  getDate();
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=111d8d44f58751fb5cc404f71f53e329`
  )
    .then((res) => res.json())
    .then( (res) => {
      
      let weatherDescrip = weatherCondition(res.weather[0].description)
      addImgIcons(options.timeOfTheDayNow,weatherDescrip)
      
      document.querySelector(".temp").innerText =
        Math.round(res.main.temp - 273) + " °C";
      document.querySelector(".name-city").innerText = res.name;
      document.querySelector(".feels-like").innerText =
        Math.round(res.main.feels_like - 273) + " °C";
      document.querySelector(".humidity").innerText = res.main.humidity + "%";
      
    })
    .catch((err)=>alert("Не вдалося отримати дані з сервера"))
}


function getDate() {
  const d = new Date();

  const day = ["Неділя","Понеділок","Вівторок","Середа","Четвер","П'ятниця","Субота"];
  const month = ["Січня","Лютого","Березня","Квітня","Травня","Червня","Липня","Серпня","Вересня","Жовтня","Листопада","Грудня"]
  const hours = d.getHours();
  const minutes = d.getMinutes();
  
  document.querySelector(".date").innerText = 
	`${d.getDate()} ${month[d.getMonth()]}, ${day[d.getDay()]}, ${hours}:${minutes}`;

  getTimeOfDay(hours)
};


function getTimeOfDay(timeNow){
timeNow>4 && timeNow<19 ? options.timeOfTheDayNow ="day" : options.timeOfTheDayNow ="night";
}

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
}

function addImgIcons(timeOfTheDay,weatherNow){
  imgIcons.src = `img/${timeOfTheDay}/icons-${weatherNow}.png`
}
