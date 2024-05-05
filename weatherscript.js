const apiKey = "077970e512f89a91e285ff2705e4f704";
const apiUrl =  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');



const checkWeather=async(city)=>{
    try{
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if(response.status == 404){
            document.querySelector('.cityName')="";
            document.querySelector('.temperature').innerHTML="Sorry Data not found";
            return;
        }

        const data = await response.json();
        console.log(data);

        document.querySelector('.cityName').innerHTML=data.name;
        document.querySelector('.temperature').innerHTML=Math.round(data.main.temp)+ "°C";
        document.querySelector('.humidity').innerHTML=data.main.humidity+"%";
        document.querySelector('.Wind').innerHTML=data.wind.speed;

        
    
    }catch(error){
       console.log("error fetching weather data ", error);
    }
}

searchButton.addEventListener("click",()=>{
    checkWeather(searchBox.value)
});
document.addEventListener("DOMContentLoaded", () => {
    const lastCity = localStorage.getItem('data');
    if (lastCity) {
        checkWeather(lastCity);
    }
});