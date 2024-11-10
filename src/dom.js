import { fahrenheitToCelsius, milesToKilometers } from "./calculations";

const $locationParagraph = document.getElementById("location");
const $conditionParagraph = document.getElementById("condition");
const $temperatureParagraph = document.getElementById("temperature");
const $fellsLikeParagraph = document.getElementById("feels-like");
const $windSpeedParagraph = document.getElementById("wind-speed");
const $humidityParagraph = document.getElementById("humidity");
const $measurementUnitSelectElement =
  document.getElementById("measurement-unit");

const $locationInputBox = document.getElementById("place-search-bar");
const $locationSearchButton = document.getElementById("search-btn");

let defaultMeasurementUnit = 1; // 0 for US and 1 for metric measurement unit
let weatherData;
let measurementUnit = defaultMeasurementUnit;

function updateDom(data) {
  $locationParagraph.textContent = data.location;
  $conditionParagraph.textContent = data.condition;
  $temperatureParagraph.textContent = measurementUnit
    ? `${fahrenheitToCelsius(data["temperature"])}°C`
    : `${data["temperature"]}°F`;
  $fellsLikeParagraph.textContent = measurementUnit
    ? `${fahrenheitToCelsius(data["feelsLike"])}°C`
    : `${data["temperature"]}°F`;
  $windSpeedParagraph.textContent = measurementUnit
    ? `${milesToKilometers(data["windSpeed"])} kmph`
    : `${data["windSpeed"]} mph`;
  $humidityParagraph.textContent = `${data["humidity"]}%`;
}

function searchLocationWeather(getData) {
  if ($locationInputBox.value === "") return;

  getData($locationInputBox.value).then((data) => {
    if (data) {
      updateDom({
        location: data["resolvedAddress"],
        condition: data["currentConditions"]["conditions"],
        temperature: data["currentConditions"]["temp"],
        feelsLike: data["currentConditions"]["feelslike"],
        windSpeed: data["currentConditions"]["windspeed"],
        humidity: data["currentConditions"]["humidity"],
      });
      weatherData = data;
    }
  });
}

$measurementUnitSelectElement.addEventListener("change", () => {
  let newMeasurementUnit = +$measurementUnitSelectElement.value;
  if (newMeasurementUnit === measurementUnit) return;
  else {
    measurementUnit = newMeasurementUnit;
    updateDom({
      location: weatherData["resolvedAddress"],
      condition: weatherData["currentConditions"]["conditions"],
      temperature: weatherData["currentConditions"]["temp"],
      feelsLike: weatherData["currentConditions"]["feelslike"],
      windSpeed: weatherData["currentConditions"]["windspeed"],
      humidity: weatherData["currentConditions"]["humidity"],
    });
  }
});

//this event listener loads the default search on the page load
window.addEventListener("load", () => {
  measurementUnit = defaultMeasurementUnit;
  $measurementUnitSelectElement.value = defaultMeasurementUnit;
  $locationInputBox.value = "Kathmandu";
  $locationSearchButton.click();
});

$locationInputBox.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    $locationSearchButton.click();
  }
});

export { updateDom, searchLocationWeather, $locationSearchButton };
