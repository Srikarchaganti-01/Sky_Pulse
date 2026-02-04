const apikey = "ae39efc61803b842eae39e64c18fea58";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const serin = document.querySelector(".search input");
const serbtn = document.querySelector(".search button");

async function check(city) {
  try {
    const res = await fetch(`${apiurl}&q=${encodeURIComponent(city)}&appid=${apikey}`);
    if (!res.ok){
      alert("City not found or API issue");
      throw new Error("City not found or API issue");
    } 

    const whdata = await res.json();
    console.log(whdata);


    document.querySelector(".cityname").textContent = whdata.name;
    document.querySelector(".short").textContent = whdata.weather[0].main;
    document.querySelector(".blocker").textContent = ":";
    document.querySelector(".tempa").textContent =  Math.round(whdata.main.temp) + "°C";
    document.querySelector(".feel").textContent = (whdata.main.feels_like) + "°C";
    document.querySelector("#minTemp").textContent = Math.round(whdata.main.temp_min -2) + "°C";
    document.querySelector("#maxTemp").textContent =(whdata.main.temp_max + 3) + "°C";
    document.querySelector("#humidVal").textContent = Math.round(whdata.main.humidity) + " %"
    document.querySelector("#windVal").textContent = (whdata.wind.speed) + " m/s"
    document.querySelector("#presVal").textContent = Math.round(whdata.main.pressure) + " hpa"
    document.querySelector("#visibVal").textContent = (whdata.visibility) + " m"
    document.querySelector("#riseVal").textContent = formatTime(whdata.sys.sunrise, whdata.timezone);
    document.querySelector("#setVal").textContent = formatTime(whdata.sys.sunset, whdata.timezone);
    whimg(whdata.weather[0].id);


  } catch (err) {
    console.error(err.message);
  }
}


function formatTime(unix, timezone) {
  const date = new Date((unix + timezone) * 1000);
  return date.toLocaleTimeString("en-IN", {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
}


function whimg(id) {
  const img = document.getElementById("weatherPic");

  switch (true) {
    case id >= 200 && id < 300:
      img.src = "assets/thunder.jpg";
      img.alt = "Thunderstorm weather";
      break;
    case id >= 300 && id < 400:
      img.src = "assets/drizzle.jpg";
      img.alt = "Drizzle weather";
      break;
    case id >= 500 && id < 600:
      img.src = "assets/rain.jpg";
      img.alt = "Rainy weather";
      break;
    case id >= 600 && id < 700:
      img.src = "assets/snow.jpg";
      img.alt = "Snowy weather";
      break;
    case id >= 700 && id < 800:
      img.src = "assets/foggy.jpg";
      img.alt = "Foggy or hazy weather";
      break;
    case id === 800:
      img.src = "assets/clear.jpg";
      img.alt = "Clear sky";
      break;
    case id > 800 && id < 900:
      img.src = "assets/clouds.jpg";
      img.alt = "Cloudy weather";
      break;
    default:
      img.src = "assets/default.jpg";
      img.alt = "Weather condition";
  }
}



serin.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        check(serin.value.trim());
        serin.value = "";
    }
});

serbtn.addEventListener("click",()=>{
  check(serin.value.trim());
  serin.value = "";
})
