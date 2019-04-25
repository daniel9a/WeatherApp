"strict mode";

// Do a CORS request to get Davis weather hourly forecast

function calcDist(lat1, lon1, lat2, lon2) 
{
  let R = 6371; // km
  let dLat = toRad(lat2-lat1);
  let dLon = toRad(lon2-lon1);
  lat1 = toRad(lat1);
  lat2 = toRad(lat2);

  let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  let d = R * c * 0.62137119;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value) 
{
    return Value * Math.PI / 180;
}
// Create the XHR object.
function createCORSRequest(method, url) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);  // call its open method
  return xhr;
}

// Make the actual CORS request.
function makeCorsRequest() {
  let firstPath = "http://api.openweathermap.org/data/2.5/forecast/hourly?";
  let city = document.getElementById("city").value;
  let newCity = "";
  if(isNaN(city) == false)
  {
    newCity = "zip=" + city;
  }
  if(isNaN(city) == true)
  {
    newCity = "q=" + city;
  }
  let restAPI = "&units=imperial&APPID=0049cffb9117913c6c97fd0d70ac3044";
  let url = firstPath + newCity + restAPI;

  let xhr = createCORSRequest('GET', url);

  // checking if browser does CORS
  if (!xhr) {
    alert('CORS not supported');
    return;
  }

  // Load some functions into response handlers.
  xhr.onload = function() {
      let davisLat = 38.5816;
      let davisLon = -121.4944; 
      let responseStr = xhr.responseText;  // get the JSON string 
      let object = JSON.parse(responseStr);  // turn it into an object
      let lat = parseFloat(JSON.stringify(object.city.coord.lat, undefined, 2));
      let lon = parseFloat(JSON.stringify(object.city.coord.lon, undefined, 2));
      
      console.log(calcDist(davisLat,davisLon,lat,lon));
      if(calcDist(davisLat,davisLon,lat,lon) > 150)
      {
        window.alert("Location not found!");
      }
      else
      {
      //console.log(JSON.stringify(object, undefined, 2));  // print it out as a string, nicely formatted
        for (i = 0; i < 6; i++) { 
          // let i = 3;
            let tempStr = JSON.stringify(object.list[i].main.temp, undefined, 2);
            let jsonTime = JSON.stringify(object.list[i].dt, undefined, 2);
            
            let myTime = new Date(parseInt(jsonTime,10)*1000);
            let hours = myTime.getHours();
            let minutes = "0" + myTime.getMinutes();
            let dd = "AM";
            if (hours >= 12) {
              hours = hours - 12;
              dd = "PM";
            }
            if (hours == 0) {
              hours = 12;
              dd = "PM";
            }
            let formattedTime = hours + ':' + minutes.substr(-2) +" "+ dd;
            let tempInput = "temp"+i;
            let timeInput = "time"+i;

            let myIcon = JSON.stringify(object.list[i].weather[0].icon, undefined, 2).trim();
            // console.log(JSON.stringify(object.list[i].weather[0].icon, undefined, 2));
            //console.log(JSON.stringify(object.list[i].weather., undefined, 2));
            

            // let img = document.createElement("IMG"+i);
            //change the pictures
            if(myIcon === '"04d"' || myIcon === '"04n"')
            {
              document.getElementById('image'+i).src = "assets/brokencloud.svg";
            }

            if(myIcon === '"01n"')
            {
              document.getElementById('image'+i).src = "assets/clear-night.svg";
            }

            if(myIcon === '"01d"')
            {
              document.getElementById('image'+i).src = "assets/clearsky.svg";
            }
            if(myIcon === '"02d"')
            {
              document.getElementById('image'+i).src = "assets/fewclouds-day.svg";
            }
            if(myIcon === '"02n"')
            {
              document.getElementById('image'+i).src = "assets/fewclouds-night.svg";
            }
            if(myIcon === '"50d"' || myIcon === '"50n"')
            {
              document.getElementById('image'+i).src = "assets/mist.svg";
            }
            if(myIcon === '"10d"')
            {
              document.getElementById('image'+i).src = "assets/rain-day.svg";
            }
            if(myIcon === '"10n"')
            {
              document.getElementById('image'+i).src = "assets/rain-night.svg";
            }
            if(myIcon === '"03d"' || myIcon === '"03n"')
            {
              document.getElementById('image'+i).src = "assets/scatteredclouds.svg";
            }
            if(myIcon === '"09d"' || myIcon === '"09n"')
            {
              document.getElementById('image'+i).src = "assets/showerrain.svg";
            }
            if(myIcon === '"13d"' || myIcon === '"13n"')
            {
              document.getElementById('image'+i).src = "assets/snow.svg";
            }
            if(myIcon === '"11d"' || myIcon === '"11n"')
            {
              document.getElementById('image'+i).src = "assets/thunderstorms.svg";
            }

            document.getElementById(tempInput).innerHTML = tempStr.substring(0, 2);
            document.getElementById(timeInput).innerHTML = formattedTime;
        }
    }
  };

  xhr.onerror = function() {
    alert('Woops, there was an error making the request.');
  };

  // Actually send request to server
  xhr.send();
}

// run this code to make request when this script file gets executed 
makeCorsRequest();