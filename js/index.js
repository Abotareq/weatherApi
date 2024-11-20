"use strict";
let searchForm = document.querySelector("#searchForm");
let weatherCard = document.querySelector("#weather");
let response;
let data;
let date;
let dayNames;
let dayIndex;
let dayName;
// Create a Date object

async function get_api(city = "cairo") {
  response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=15932340a9fc47daafd183104240309&q=${city}&days=3`,
    {
      method: "GET",
    }
  );
  if (response.status === 200) {
    data = await response.json();
    date = new Date(data.forecast.forecastday[0].date);

    // Array of day names
    dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // Get the day index (0 for Sunday, 1 for Monday, etc.)
    dayIndex = date.getDay();

    // Get the day name
    dayName = dayNames[dayIndex];
    console.log(data);
  } else {
    return false;
  }
}

searchForm.addEventListener("input", function (e) {
  let box;
  if (get_api(searchForm.value)) {
    box = `   <div class="row">
          <div  class="wcard border-0 rounded-end-5 today  col-md-4 position-relative">
            <div class="cardhead top-0 border-0 rounded-bottom-0 rounded-end-5 position-absolute start-0 end-0">
              <div class="d-flex py-1 px-3 justify-content-between text-white-50">
                <p>${dayName}</p>
                <p>${data.location.localtime}</p>
              </div>
            </div>
            <div class="cardcontent mt-5 p-3">
              <p class="text-white-50 ">
              ${data.location.name}
              </p>
              <p class="tempr text-white">
                ${data.current.temp_c}C
              </p>
              <img src="${data.current.condition.icon}" alt="cloud" width="90px">
              <p class="text-info">
                  ${data.current.condition.text}
              </p>
              <div class="icons d-flex justify-content-between text-white-50 align-baseline">
                <span class="d-flex gap-2">
                  <i class="fa-solid fa-umbrella"></i>
                  <p>
                  ${data.current.humidity}%
                  </p>
                </span>
                <span class="d-flex gap-2">
                  <i class="fa-solid fa-wind"></i>
                  <p>
                     ${data.current.wind_kph} km/h
                  </p>
                </span>
                <span class="d-flex gap-2">
                  <i class="fa-brands fa-nfc-directional"></i>
                  <p>
                     ${data.current.wind_dir}
                  </p>
                </span>
              </div>
            </div>
          </div>
          <div class="wcard yesterday  col-md-4 position-relative">
            <div class="cardhead top-0  position-absolute start-0 end-0">
              <div class="text-center py-1 px-3  text-white-50">
                <p>${data.forecast.forecastday[1].date}</p>

              </div>
            </div>
            <div class="cardcontent text-center mt-5 p-5">
              <img src=${data.forecast.forecastday[1].day.condition.icon} alt="cloud" class="mt-4 mb-3" width="48px">
              <p class="text-white fw-bold fs-2">
                ${data.forecast.forecastday[1].day.maxtemp_c} c
              </p>
              <p class="text-white-50">
                ${data.forecast.forecastday[1].day.mintemp_c} C
              </p>
              <p class="text-info">
              ${data.forecast.forecastday[1].day.condition.text}
              </p>
            </div>
          </div>
          <div class="wcard daybefore border-0 rounded-start-5 col-md-4 position-relative">
            <div class="cardhead top-0  position-absolute start-0 end-0 rounded-top-5 rounded-end-0">
              <div class="text-center py-1 px-3  text-white-50">
                <p>${data.forecast.forecastday[2].date}</p>

              </div>
            </div>
            <div class="cardcontent text-center mt-5 p-5">
              <img src=${data.forecast.forecastday[2].day.condition.icon} alt="cloud" class="mt-4 mb-3" width="48px">
              <p class="text-white fw-bold fs-2">
                ${data.forecast.forecastday[2].day.maxtemp_c} c
              </p>
              <p class="text-white-50">
                 ${data.forecast.forecastday[2].day.mintemp_c} C
              </p>
              <p class="text-info">
                ${data.forecast.forecastday[2].day.condition.text}
              </p>
            </div>
          </div>
        </div>

`;
  } else {
    get_api();
  }
  weatherCard.innerHTML = box;
});
