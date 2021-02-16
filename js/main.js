selectCity("lutsk")


const buttonsCities = document.querySelectorAll(".btn-cities");
buttonsCities.forEach(cityButton=>{
	cityButton.addEventListener("click", ()=> selectCity(cityButton.dataset.city))
});



function selectCity(city){
	fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=111d8d44f58751fb5cc404f71f53e329`)
	.then(i=>i.json())
	.then(i=>{
		document.querySelector(".temp").innerText = Math.round(i.main.temp-273) + " °C";
		document.querySelector(".name-city").innerText = i.name;
		document.querySelector(".feels-like-block").innerText = Math.round(i.main.feels_like-273) + " °C";
		document.querySelector(".humidity").innerText = i.main.humidity + "%";

	})
}