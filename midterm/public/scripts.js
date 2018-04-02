var tomorrowTemp;
var tomorrowWeather;
var historyTemp;
var order;
var todayDate;
var dateBefore;


var app = {


  initialize: function() {
    app.getWeatherData();
    // app.getHistoryWeather();

		var city=$("#cityName").val();
		$('#cityTyped').html(city);

		var now = new Date();
		// console.log(now.getFullYear());
		// console.log(now.getMonth() + 1);
		// console.log(now.getDate());
		todayDate = now.getFullYear()+"-0"+(now.getMonth() + 1)+"-"+(now.getDate()-1);
		console.log(todayDate);
		dateBefore = now.getFullYear()+"-0"+(now.getMonth() + 1)+"-0"+(now.getDate()-13);
		console.log(dateBefore);

  },

  getWeatherData: function() {
    var weatherURL = "https://api.openweathermap.org/data/2.5/forecast/daily?mode=json&units=metric&cnt=2&q=";
		var defaultcity = $("#cityName").attr("value");
		var currentSearchWord = defaultcity;
    var myKey = '&APPID=' + '001b0f58045147663b1ea518d34d88b4';

    var weatherReqURL = weatherURL + currentSearchWord + myKey;

    $('#getweather').click(function() {
      currentSearchWord = $("#cityName").val();
      weatherReqURL = weatherURL + currentSearchWord + myKey;
			$.ajax({
				url: weatherReqURL,
				data: {},
				// type: 'GET',
				// dataType: 'jsonp',
				error: function(err) {
					console.log(err);
				},
				success: function(data) {
					console.log("get tomorrow weather");
					app.getHistoryWeather();
					//debugger;
					console.log(data);
					tomorrowTemp = data.list[1].temp.max;
					$('#weahterInfoP').html(tomorrowTemp + " °C");
					$('#cityTyped').html(currentSearchWord);
					console.log("tomorrow weather is: " + tomorrowTemp);
					tomorrowWeather = data.list[1].weather[0].main;
					console.log(tomorrowWeather);
					if(tomorrowWeather === "Clear"){
						$("#weatherIcon").attr("src", "imgs/Clear.png");
					}else if(tomorrowWeather === "Clouds"){
						$("#weatherIcon").attr("src", "imgs/Clouds.png");
					}else if(tomorrowWeather === "Rain"){
						$("#weatherIcon").attr("src", "imgs/Rain.png");
					}else if(tomorrowWeather === "Snow"){
						$("#weatherIcon").attr("src", "imgs/Snow.png");
					}
				}
			});
    });


    $.ajax({
      url: weatherReqURL,
      data: {},
      // type: 'GET',
      // dataType: 'jsonp',
      error: function(err) {
        console.log(err);
      },
      success: function(data) {
        console.log("get tomorrow weather");
        //debugger;
        console.log(data);
        tomorrowTemp = data.list[1].temp.max;
        $('#weahterInfoP').html(tomorrowTemp + " °C");
        console.log("tomorrow weather is: " + tomorrowTemp);
				tomorrowWeather = data.list[1].weather[0].main;
				console.log(tomorrowWeather);
				if(tomorrowWeather === "Clear"){
					$("#weatherIcon").attr("src", "imgs/Clear.png");
				}else if(tomorrowWeather === "Clouds"){
					$("#weatherIcon").attr("src", "imgs/Clouds.png");
				}else if(tomorrowWeather === "Rain"){
					$("#weatherIcon").attr("src", "imgs/Rain.png");
				}else if(tomorrowWeather === "Snow"){
          $("#weatherIcon").attr("src", "imgs/Snow.png");
        }
				app.getHistoryWeather();
      }
    });

  },


  getHistoryWeather: function() {
    var weatherURL = "http://api.worldweatheronline.com/premium/v1/past-weather.ashx?tp=24&format=json&q=";
    var defaultcity = $("#cityName").attr("value");
    var currentSearchWord = defaultcity;
    var myKey = '&key=' + '377b23c776c042f2aad172738181503';
    var startDate = '&date=' + dateBefore; //change to today - 5
    var endDate = '&enddate=' + todayDate; //change to today


    weatherReqURL = weatherURL + currentSearchWord + myKey + startDate + endDate;

    $('#getweather').click(function() {
      currentSearchWord = $("#cityName").val();
      weatherReqURL = weatherURL + currentSearchWord + myKey + startDate + endDate;
      console.log(weatherReqURL);

			$.ajax({
	      url: weatherReqURL,
	      data: {},
	      // type: 'GET',
	      // dataType: 'jsonp',
	      error: function(err) {
	        console.log(err);
	      },
	      success: function(data) {
	        console.log("get history weather");
	        //debugger;
	        console.log(data);

	        for (var i = 0; i < data.data.weather.length; i++) {
	          var eachHistoryTemp = data.data.weather[i].maxtempC;
	          if ((tomorrowTemp - eachHistoryTemp) <= 1 && (tomorrowTemp - eachHistoryTemp) >= (-1)) {
	            order = i;
	            console.log("It is " + order);
							$('#similarDate').html(data.data.weather[i].date);
	            app.getInsData();
	          } else {
	            console.log("no date similar.");
	          }
	        }

	      }
	    });
    });

    $.ajax({
      url: weatherReqURL,
      data: {},
      // type: 'GET',
      // dataType: 'jsonp',
      error: function(err) {
        console.log(err);
      },
      success: function(data) {
        console.log("get history weather");
        //debugger;
        console.log(data);

        for (var i = 0; i < data.data.weather.length; i++) {
          var eachHistoryTemp = data.data.weather[i].maxtempC;
          if ((tomorrowTemp - eachHistoryTemp) <= 1 && (tomorrowTemp - eachHistoryTemp) >= (-1)) {
            order = i;
            console.log("It is " + order);
						$('#similarDate').html(data.data.weather[i].date);
            app.getInsData();
          } else {
            console.log("no date similar.");
          }
        }
      }
    });

  },


  getInsData: function() {
    $.getJSON("ins.json", function(data) {
      // console.log(data);
      var insData = {
        Data: data
      };
      console.log(insData);
      // console.log(insData.Data[order].images.standard_resolution.url);
      var imageUrl = insData.Data[13-order].images.standard_resolution.url;
      // console.log(imageUrl);
      $("#outfitChoose").attr("src", imageUrl);

			var likes = insData.Data[13-order].likes.count;

			for (i=0; i<=likes; i++){
				$('#likes').prepend('<img id="likesImage" src="imgs/like.png" />')
			}

    })
  },

}
