const api_key = "077970e512f89a91e285ff2705e4f704";
const api_url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');
const weathericon = document.querySelector('.weathericon');
const saveWeatherData = (data) => {
    localStorage.setItem('weatherData', JSON.stringify(data));
}

// Function to load weather data from local storage
const loadWeatherData = () => {
    return JSON.parse(localStorage.getItem('weatherData'));
}
const checkWeather = async (city) => {

    try {
        const response = await fetch(api_url + city+`&appid=${api_key}`);
        if(response.status==404){
            document.querySelector('.temperature').innerHTML="";
         document.querySelector('.cityName').innerHTML="sorry Data not found";
return;
        }
        
        const data = await response.json();
        
        console.log(data);
        
        document.querySelector('.cityName').innerHTML = data.name;
        document.querySelector('.temperature').innerHTML = Math.round( data.main.temp) + "°C";
        document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
        document.querySelector('.wind').innerHTML = data.wind.speed;
        if (data.weather[0].main=="Clouds") {
            weathericon.src="images/clouds.png";
        }else if (data.weather[0].main=="Drizzle") {
            weathericon.src="images/drizzle.png";
            
        }else if (data.weather[0].main=="Mist") {
            weathericon.src="images/mist.png";
            
        }else if (data.weather[0].main=="Clear") {
            weathericon.src="images/clear.png";
            
        }else if (data.weather[0].main=="Rainy") {
            weathericon.src="images/rain.png";
            
        }
        saveWeatherData(data);

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

const handleSearch = () => {
    checkWeather(searchBox.value);
}

searchButton.addEventListener("click", handleSearch);
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission
        handleSearch();
    }
});

window.addEventListener('load', () => {
    const storedWeatherData = loadWeatherData();
   
    if (storedWeatherData) {
        // Populate the UI with the stored weather data
        document.querySelector('.cityName').innerHTML = storedWeatherData.name;
        document.querySelector('.temperature').innerHTML = Math.round(storedWeatherData.main.temp) + "°C";
        document.querySelector('.humidity').innerHTML = storedWeatherData.main.humidity + "%";
        document.querySelector('.wind').innerHTML = storedWeatherData.wind.speed;

        const weatherMain = storedWeatherData.weather[0].main;
        if (weatherMain === "Clouds") {
            weathericon.src = "images/clouds.png";
        } else if (weatherMain === "Drizzle") {
            weathericon.src = "images/drizzle.png";
        } else if (weatherMain === "Mist") {
            weathericon.src = "images/mist.png";
        } else if (weatherMain === "Clear") {
            weathericon.src = "images/clear.png";
        } else if (weatherMain === "Rainy") {
            weathericon.src = "images/rain.png";
        }
    }
});