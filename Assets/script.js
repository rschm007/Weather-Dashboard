$(document).ready(function () {
  // city stored from search form
  let cityName = $(".search").val();
  console.log(cityName);

  // constant for now moment
  const now = moment().format("LL");

  // // button click functions
  // $("button").on("click", function(event) {
  //   cityName = $(this).closest('td').find('button').text();
  //   function reloadPage(){
  //     location.reload(true);
  //   }
  //   reloadPage();
  //   console.log(cityName);
  // });

  // if the user hits enter in the search form, click the search button
  $(".search").keypress(function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      $(".searchBtn").click();
    }
  });

  // when the user clicks the search button, populate the page
  $(".searchBtn").on("click", function () {
    event.preventDefault();

    // get the value of the search form from the user
    cityName = $(".search").val();

    // make all DOM elements visible
    $(".invisible").addClass("visible").removeClass("invisible");
    
    // openweather API settings
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

      // add location and date to header DOM
      $(".location").text(cityName);

      // insert date into DOM
      $(".currentDate").text(" (" + now + ")");

      // gather the current weather to make into an icon
      let weatherIcon = response.weather[0].icon;

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

      // define a function that will take care of appending the DOM with the forecast cards
      function forecastCards(
        responseForecast,
        dayCard,
        dayDate,
        dayNumberAdd,
        iconClass,
        listNum,
        dayTemp,
        dayHumidity
      ) {
        $(dayCard).append(
          "<div class='" +
            dayDate +
            " bg-blue-700 rounded-lg text-white text-xl font-medium m-2 p-1 pl-2'></div>"
        );
        $("." + dayDate).text(moment().add(dayNumberAdd, "days").format("L"));
        $(dayCard).append(
          "<img src='' class='" + iconClass + " ml-4 w-20 h-20'></img>"
        );
        weatherIconDOM(
          "." + iconClass,
          responseForecast.list[listNum].weather[0].icon
        );
        $(dayCard).append("<div class='" + dayTemp + " m-2'></div>");
        $("." + dayTemp).text(
          "Temp: " +
            (Math.round(
              (responseForecast.list[listNum].main.temp - 273.15) * 1.8 + 32
            ) +
              String.fromCharCode(176) +
              "F")
        );
        $(dayCard).append("<div class='" + dayHumidity + " m-2'></div>");
        $("." + dayHumidity).text(
          "Humidity: " + responseForecast.list[listNum].main.humidity + "%"
        );
      }

      // API call for 5 day forecast data
      $.ajax({
        url: queryForecast,
        method: "GET",
      }).then(function (responseForecast) {
        console.log(responseForecast);
        //   define the DOM cards by calling forecastCards function
        forecastCards(
          responseForecast,
          ".dayOne",
          "dayOneDate",
          1,
          "dayOneIcon",
          0,
          "dayOneTemp",
          "dayOneHumidity"
        );
        forecastCards(
          responseForecast,
          ".dayTwo",
          "dayTwoDate",
          2,
          "dayTwoIcon",
          1,
          "dayTwoTemp",
          "dayTwoHumidity"
        );
        forecastCards(
          responseForecast,
          ".dayThree",
          "dayThreeDate",
          3,
          "dayThreeIcon",
          2,
          "dayThreeTemp",
          "dayThreeHumidity"
        );
        forecastCards(
          responseForecast,
          ".dayFour",
          "dayFourDate",
          4,
          "dayFourIcon",
          3,
          "dayFourTemp",
          "dayFourHumidity"
        );
        forecastCards(
          responseForecast,
          ".dayFive",
          "dayFiveDate",
          5,
          "dayFiveIcon",
          4,
          "dayFiveTemp",
          "dayFiveHumidity"
        );
      });
    });
  });
});
