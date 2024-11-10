function fahrenheitToCelsius(valueInFahrenheit) {
  let valueInCelsius = parseFloat(
    ((valueInFahrenheit - 32) * (5 / 9)).toFixed(1),
  );
  return valueInCelsius;
}

function milesToKilometers(valueInMiles) {
  let valueInKilometers = parseFloat((valueInMiles * 1.60934).toFixed(1));
  return valueInKilometers;
}

export { fahrenheitToCelsius, milesToKilometers };
