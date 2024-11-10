import "./style.css";
import { searchLocationWeather, $locationSearchButton } from "./dom";

const weatherApi = "EKQXAKD9BJS5KRTXZ6KZ2UMT5";

async function getData(place) {
  let data = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?key=${weatherApi}
`,
    {
      mode: "cors",
    },
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      return response;
    })
    .catch((error) => {
      alert("Opps! Something is wrong here");
      return;
    });
  return data;
}

$locationSearchButton.addEventListener("click", () => {
  searchLocationWeather(getData);
});
