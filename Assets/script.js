// placeholder cityName var. Comment this out to test
var cityName = "Irvine";

// constant for now moment
const now = moment().format("LL");

$(document).ready(function () {
  const API = "876faa7d5be6244a6c4e363606e24ecc";
  var queryURLWeather =
    "https:/api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=876faa7d5be6244a6c4e363606e24ecc";

  // API call for general weather
  $.ajax({
    url: queryURLWeather,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    // insert the LocationDate DOM object
    $(".LocationDate").text(response.name + " " + now);

    // insert the Temperature DOM object
    $(".temperature").text(
      "Temperature: " +
        Math.round((response.main.temp - 273.15) * 1.8 + 32) +
        String.fromCharCode(176) +
        "F"
    );

    // insert the humidity DOM object
    $(".humidity").text("Humidity: " + response.main.humidity + "%");

    // insert the wind speed DOM object
    $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");

    // gathering vars for the UV Index ajax call

    let latitude = response.coord.lat;
    let longitude = response.coord.lon;

    var queryUV =
      "https://api.openweathermap.org/data/2.5/uvi?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=876faa7d5be6244a6c4e363606e24ecc";

    //   API call for UV Index
    $.ajax({
      url: queryUV,
      method: "GET",
    }).then(function (responseUV) {
      console.log(responseUV);
      var uvIndexValue = responseUV.value;
      $(".uvIndex").text(uvIndexValue);
      //   define a function that will insert the UV Index DOM object AND change the uvIndex span color according to severity
      function uvIndexSeverity(uvIndexValue) {
        if (uvIndexValue <= 2) {
          $(".uvIndex").addClass("bg-green-500");
        } else if (uvIndexValue >= 3 && uvIndexValue <= 5) {
          $(".uvIndex").addClass("bg-yellow-400");
          $(".uvIndex").addClass("text-black").removeClass("text-white");
        } else if (uvIndexValue == 6 || 7) {
          $(".uvIndex").addClass("bg-orange-600");
        } else if (uvIndexValue >= 8 && uvIndexValue <= 10) {
          $(".uvIndex").addClass("bg-red-700");
        } else {
          $(".uvIndex").addClass("bg-purple-800");
        }
      };

      uvIndexSeverity(uvIndexValue);

    });
  });
});
