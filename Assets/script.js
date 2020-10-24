var latitude;
var longitude;

// first we get the user's latitude and longitude geolocation
navigator.geolocation.getCurrentPosition(
    function(position){
        var latitude  = position.coords.latitude;
        var longitude = position.coords.longitude;
        console.log("Latitude : "+ latitude +" Longitude : "+ longitude);
        return latitude + longitude;
    },
    function(){
        alert("Geo Location not supported");
    }
);   

$(document).ready(function () {

    
    const API = "876faa7d5be6244a6c4e363606e24ecc";
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + API;
    
    // API call
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response);
        console.log(queryURL);
    });
});
