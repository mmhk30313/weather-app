// This key is my current key...
// key: '1913a9e23b8ad5a21f2578fe7f11d994',
// base: 'http://api.openweathermap.org/data/2.5/'
// code of degree (°) from the keyboard = Alt + 0176
const kelvin = 273;
const api = {
    key: 'a0943bfbb8f7a953372cfc193a5244fa',
    base: 'http://api.openweathermap.org/data/2.5/'
}

const searchBox = document.querySelector('.weather .input-city');
searchBox.addEventListener('keypress', setQuery);

function setQuery(evt){
    if(evt.keyCode == 13 || evt == 'click'){//13 ->key code of the Enter button from computer keyboard
        getResults(searchBox.value);
        // console.log(searchBox.value);
    }
}

function getResults(query){
    fetch('http://api.openweathermap.org/data/2.5/weather?q='+searchBox.value+'&appid=a0943bfbb8f7a953372cfc193a5244fa')
    // fetch(`${api.base}weather?q=${query}&appid=${api.key}`)
    .then(response => response.json())
    // .then(data => 
    //     // console.log(data)
    //     displayResults(data)
    // )
    .then(function(data){//Ei data holo object, ja current live weather er details
        // console.log(data);
        displayResults(data);
    })
    .catch(err => alert('Wrong City'))
}

const locationCity = document.getElementById('city-location');
const date = document.getElementById('date');
const currentTemperature = document.getElementById('cur-temperature');
const weatherDescription = document.getElementById('w-description');
const minByMaxTemperature = document.getElementById('low-high');
const weatherImage = document.getElementById('w-img');
function displayResults(data){
    // console.log(data);
    //type-1
    // locationCity.innerHTML = data['name']+", "+data['sys']['country'];
    
    //type-2
    // locationCity.innerHTML = `${data.name}, ${data.sys.country}`;
    
    //type-3
    locationCity.innerHTML = ''+data.name+', '+data.sys.country+'';
    
    // let now = new Date();
    // console.log(now,'\n',now.getDay());
    
    // date.innerText = dateBuilder(now);
    
    currentTemperature.innerText = (Math.floor(data.main.temp)-kelvin)+"°c";
    weatherDescription.innerHTML = data.weather[0].description;
    minByMaxTemperature.innerText = `${Math.floor(data.main.temp_min)-kelvin}­°c / ${Math.floor(data.main.temp_max)-kelvin}°c`;
    weatherImage.innerHTML = `<img class="img-beauty" src="icons/${data.weather[0].icon}.png">`;
}

function dateBuilder (d) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    //d => (new Date()) current time...
    let day = days[d.getDay()];//d.getDay() returns n-th day of the week... 
    let date = d.getDate();//d.getDate() returns n-th day of the month... 
    let month = months[d.getMonth()];//d.getMonth() returns n-th day of the year... 
    let year = d.getFullYear();//d.getFullYear() returns the current year... 
  
    return `${day} ${date} ${month} ${year}`;
}