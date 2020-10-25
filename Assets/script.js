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

    // gather the current weather to make into an icon
    let weatherIcon = response.weather[0].icon;

    // insert the LocationDate DOM object
    $(".LocationDate").text(response.name + " (" + now + ")");

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

    // define a function that changes the weatherIcon in the LocationDate icon
    function weatherIconDOM(className, iconResponse) {
      // clear sky group
      if (iconResponse === "01d") {
        $(className).attr(
          "src",
          "https://cdn0.iconfinder.com/data/icons/weather-filled-outline-6/64/weather_cloud_sun_moon_rain-49-512.png"
        );
        // few clouds group
      } else if (iconResponse === "02d") {
        $(className).attr(
          "src",
          "https://cdn0.iconfinder.com/data/icons/weather-filled-outline-6/64/weather_cloud_sun_moon_rain-04-512.png"
        );
        // scattered clouds group
      } else if (iconResponse === "03d") {
        $(className).attr(
          "src",
          "https://cdn0.iconfinder.com/data/icons/weather-filled-outline-6/64/weather_cloud_sun_moon_rain-41-512.png"
        );
        // broken clouds group
      } else if (iconResponse === "04d") {
        $(className).attr(
          "src",
          "https://cdn0.iconfinder.com/data/icons/weather-filled-outline-6/64/weather_cloud_sun_moon_rain-05-512.png"
        );
        // shower rain group
      } else if (iconResponse === "09d") {
        $(className).attr(
          "src",
          "https://cdn0.iconfinder.com/data/icons/weather-filled-outline-6/64/weather_cloud_sun_moon_rain-02-512.png"
        );
        // rain group
      } else if (iconResponse === "10d") {
        $(className).attr(
          "src",
          "https://cdn0.iconfinder.com/data/icons/weather-filled-outline-6/64/weather_cloud_sun_moon_rain-03-512.png"
        );
        // thunderstorm group
      } else if (iconResponse === "11d") {
        $(className).attr(
          "src",
          "https://www.iconfinder.com/icons/5896932/moon_cloud_sun_weather_rain_icon"
        );
        // snow group
      } else if (iconResponse === "13d") {
        $(className).attr(
          "src",
          "https://cdn0.iconfinder.com/data/icons/weather-filled-outline-6/64/weather_cloud_sun_moon_rain-21-512.png"
        );
        // mist group
      } else {
        $(className).attr(
          "src",
          "https://cdn0.iconfinder.com/data/icons/weather-filled-outline-6/64/weather_cloud_sun_moon_rain-18-512.png"
        );
      }
    }
    weatherIconDOM(".weatherIcon", weatherIcon);

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
      }
      uvIndexSeverity(uvIndexValue);
    });
    var queryForecast =
      "https:/api.openweathermap.org/data/2.5/forecast?q=" +
      cityName +
      "&appid=876faa7d5be6244a6c4e363606e24ecc";

    // API call for 5 day forecast data
    $.ajax({
      url: queryForecast,
      method: "GET",
    }).then(function (responseForecast) {
      console.log(responseForecast);
      //   define the DOM card for day +1
      $(".dayOne").append(
        "<div class='dayOneDate text-teal-900 font-medium m-2'></div>"
      );
      $(".dayOneDate").text(moment().add(1, "days").format("L"));
      $(".dayOne").append("<img src='' class='dayOneIcon place-self-center w-20 h-20'></img>");
      weatherIconDOM(".dayOneIcon", responseForecast.list[0].weather[0].icon);
      $(".dayOne").append("<div class='dayOneTemp m-2'></div>");
      $(".dayOneTemp").text(
        "Temp: " +
          (Math.round(
            (responseForecast.list[0].main.temp - 273.15) * 1.8 + 32
          ) +
            String.fromCharCode(176) +
            "F")
      );
      $(".dayOne").append("<div class='dayOneHumidity m-2'></div>");
      $(".dayOneHumidity").text(
        "Humidity: " + responseForecast.list[0].main.humidity + "%"
      );
      //   day +2
      $(".dayTwo").append(
        "<div class='dayTwoDate text-teal-900 font-medium m-2'></div>"
      );
      $(".dayTwoDate").text(moment().add(2, "days").format("L"));
      $(".dayTwo").append("<img src='' class='dayTwoIcon w-20 h-20'></img>");
      weatherIconDOM(".dayTwoIcon", responseForecast.list[1].weather[0].icon);
      $(".dayTwo").append("<div class='dayTwoTemp m-2'></div>");
      $(".dayTwoTemp").text(
        "Temp: " +
          (Math.round(
            (responseForecast.list[1].main.temp - 273.15) * 1.8 + 32
          ) +
            String.fromCharCode(176) +
            "F")
      );
      $(".dayTwo").append("<div class='dayTwoHumidity m-2'></div>");
      $(".dayTwoHumidity").text(
        "Humidity: " + responseForecast.list[1].main.humidity + "%"
      );
      // day +3
      $(".dayThree").append(
        "<div class='dayThreeDate text-teal-900 font-medium m-2'></div>"
      );
      $(".dayThreeDate").text(moment().add(3, "days").format("L"));
      $(".dayThree").append("<img src='' class='dayThreeIcon w-20 h-20'></img>");
      weatherIconDOM(".dayThreeIcon", responseForecast.list[2].weather[0].icon);
      $(".dayThree").append("<div class='dayThreeTemp m-2'></div>");
      $(".dayThreeTemp").text(
        "Temp: " +
          (Math.round(
            (responseForecast.list[2].main.temp - 273.15) * 1.8 + 32
          ) +
            String.fromCharCode(176) +
            "F")
      );
      $(".dayThree").append("<div class='dayThreeHumidity m-2'></div>");
      $(".dayThreeHumidity").text(
        "Humidity: " + responseForecast.list[2].main.humidity + "%"
      );
      // day +4
      $(".dayFour").append(
        "<div class='dayFourDate text-teal-900 font-medium m-2'></div>"
      );
      $(".dayFourDate").text(moment().add(4, "days").format("L"));
      $(".dayFour").append("<img src='' class='dayFourIcon w-20 h-20'></img>");
      weatherIconDOM(".dayFourIcon", responseForecast.list[3].weather[0].icon);
      $(".dayFour").append("<div class='dayFourTemp m-2'></div>");
      $(".dayFourTemp").text(
        "Temp: " +
          (Math.round(
            (responseForecast.list[3].main.temp - 273.15) * 1.8 + 32
          ) +
            String.fromCharCode(176) +
            "F")
      );
      $(".dayFour").append("<div class='dayFourHumidity m-2'></div>");
      $(".dayFourHumidity").text(
        "Humidity: " + responseForecast.list[3].main.humidity + "%"
      );
      // day +5
      $(".dayFive").append(
        "<div class='dayFiveDate text-teal-900 font-medium m-2'></div>"
      );
      $(".dayFiveDate").text(moment().add(5, "days").format("L"));
      $(".dayFive").append("<img src='' class='dayFiveIcon w-20 h-20'></img>");
      weatherIconDOM(".dayFiveIcon", responseForecast.list[4].weather[0].icon);
      $(".dayFive").append("<div class='dayFiveTemp m-2'></div>");
      $(".dayFiveTemp").text(
        "Temp: " +
          (Math.round(
            (responseForecast.list[4].main.temp - 273.15) * 1.8 + 32
          ) +
            String.fromCharCode(176) +
            "F")
      );
      $(".dayFive").append("<div class='dayFiveHumidity m-2'></div>");
      $(".dayFiveHumidity").text(
        "Humidity: " + responseForecast.list[4].main.humidity + "%"
      );
    });
  });
});
