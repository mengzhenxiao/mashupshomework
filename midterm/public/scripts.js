

var app = {
	tomorrowWeather : [],
	// flickrData : [],

	initialize: function() {
		app.getWeatherData();
	},

	// makeHTML: function() {
	// 	$('#weahterInfoP').html(app.tomorrowWeather[0]);
	// },

	getWeatherData: function(){
		//console.log("Get Flickr Data");
		var weatherURL = "https://api.openweathermap.org/data/2.5/forecast/daily?mode=json&units=metric&cnt=2&q=";
		var currentSearchWord = "New%20York";
		var myKey = '&APPID=' + '';

		var weatherReqURL = weatherURL + currentSearchWord + myKey;

    $('#getweather').click(function(){
			currentSearchWord = "$("#cityName").val()"
			weatherReqURL = weatherURL + currentSearchWord + myKey;


		$.ajax({
			url: weatherReqURL,
			data: {},
			// type: 'GET',
			// dataType: 'jsonp',
			error: function(err){
				console.log(err);
			},
			success: function(data){
				console.log("WooHoo!");
				//debugger;
				console.log(data);
				$('#weahterInfoP').html(data.list[1].temp.day);
				// $('#weahterInfoP').html("hahaha");
				console.log(data.list[1].temp.day);
				// var tomorrowWeather = data.list[1].temp.day;
				// if (data.list[1].temp.day){
				// 		app.tomorrowWeather.push(data.list[1].temp.day);}
				// 		console.log(tomorrowWeather[0]);
				// app.makeHTML();
			}
		});
	}

	}

	// getNYTimesData: function() {
	// 	console.log("Get NY Times Data");
	// 	var currentSearchWord = 'apple';
	// 	var nyTimesURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + currentSearchWord + '&page=0&sort=newest&api-key=';
	// 	var myNYKey = '476315a079204d198fc7db004146ba4b';
	// 	var nyTimesReqURL = nyTimesURL + myNYKey;
	// 	console.log(nyTimesReqURL);
	// 	$.ajax({
	// 		url: nyTimesReqURL,
	// 		type: 'GET',
	// 		dataType: 'json',
	// 		error: function(err){
	// 			console.log("Uh oh...");
	// 			console.log(err);
	// 		},
	// 		success: function(data){
	// 			//console.log(data);
	// 			//debugger;
	// 			app.nyTimesArticles = data.response.docs;
	// 			console.log(app.nyTimesArticles);
	// 			app.getFlickrData();
	// 		}
	// 	});
	// }



};
