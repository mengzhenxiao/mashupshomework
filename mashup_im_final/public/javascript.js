//global var
var trendsTime;
var trendsValue;



//geojson
var width = 960,
  height = 700;

var svg = d3.select("#map").append("svg")
  .attr("width", width)
  .attr("height", height);

var xym = d3.geo.albers();
var path = d3.geo.path().projection(xym);

xym.origin([134, 25])
xym.translate([350, 745])
xym.parallels([24.6, 43.6])
xym.scale(1980)

d3.json("japan.json", function(data) {
  svg.selectAll("path").data(data.features)
    .enter().append("path")
    .attr("d", path)
    .style("fill", function() {
      return "#ffc2c9"
    })
    .on("mouseover", function(e) {
      d3.select(this).style("fill", "#e96979")
    })
    .on("mouseout", function(e) {
      d3.select(this).style("fill", "#ffc2c9")
    })
});

//weather data visualization
// var svg = d3.select("#weather"),
//     margin = {top: 20, right: 20, bottom: 30, left: 40},
//     width = +svg.attr("width") - margin.left - margin.right,
//     height = +svg.attr("height") - margin.top - margin.bottom,
//     g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
// var x = d3.scaleBand()
//     .rangeRound([0, width])
//     .paddingInner(0.05)
//     .align(0.1);
//
// var y = d3.scaleLinear()
//     .rangeRound([height, 0]);
//
// var z = d3.scaleOrdinal()
//     .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
//
// d3.csv("data.csv", function(d, i, columns) {
//   for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
//   d.total = t;
//   return d;
// }, function(error, data) {
//   if (error) throw error;
//
//   var keys = data.columns.slice(1);
//
//   data.sort(function(a, b) { return b.total - a.total; });
//   x.domain(data.map(function(d) { return d.State; }));
//   y.domain([0, d3.max(data, function(d) { return d.total; })]).nice();
//   z.domain(keys);
//
//   g.append("g")
//     .selectAll("g")
//     .data(d3.stack().keys(keys)(data))
//     .enter().append("g")
//       .attr("fill", function(d) { return z(d.key); })
//     .selectAll("rect")
//     .data(function(d) { return d; })
//     .enter().append("rect")
//       .attr("x", function(d) { return x(d.data.State); })
//       .attr("y", function(d) { return y(d[1]); })
//       .attr("height", function(d) { return y(d[0]) - y(d[1]); })
//       .attr("width", x.bandwidth());
//
//   g.append("g")
//       .attr("class", "axis")
//       .attr("transform", "translate(0," + height + ")")
//       .call(d3.axisBottom(x));
//
//   g.append("g")
//       .attr("class", "axis")
//       .call(d3.axisLeft(y).ticks(null, "s"))
//     .append("text")
//       .attr("x", 2)
//       .attr("y", y(y.ticks().pop()) + 0.5)
//       .attr("dy", "0.32em")
//       .attr("fill", "#000")
//       .attr("font-weight", "bold")
//       .attr("text-anchor", "start")
//       .text("Population");
//
//   var legend = g.append("g")
//       .attr("font-family", "sans-serif")
//       .attr("font-size", 10)
//       .attr("text-anchor", "end")
//     .selectAll("g")
//     .data(keys.slice().reverse())
//     .enter().append("g")
//       .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
//
//   legend.append("rect")
//       .attr("x", width - 19)
//       .attr("width", 19)
//       .attr("height", 19)
//       .attr("fill", z);
//
//   legend.append("text")
//       .attr("x", width - 24)
//       .attr("y", 9.5)
//       .attr("dy", "0.32em")
//       .text(function(d) { return d; });
// });



//google trends visualization
function makeTrendsChart(trendsTime, trendsValue) {

  $('#trends').html('');

  var w = 1200;
  var h = 300;
  var barPadding = 2;

  //change date format
  // var parseDate = d3.timeParse("%d-%b");
  // console.log(parseDate("Mar 1"));

  var valueMin = d3.min(trendsValue, function(d) {
    return d;
  });
  var valueMax = d3.max(trendsValue, function(d) {
    return d;
  });
  var timeMin = d3.min(trendsTime, function(d) {
    return d;
  });
  var timeMax = d3.max(trendsTime, function(d) {
    return d;
  });

  var yScale = d3.scaleLinear()
    .domain([valueMin, valueMax])
    .range([50, h - 50]);

  var xScale = d3.scaleBand()
    .domain(trendsTime)
    .range([0, w])
    .paddingInner(0.01);

  var xAxis = d3.axisBottom(xScale).ticks(10);

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    // .offset([-10, 0])
    .html(function(d) {
      return "<strong>Value:</strong> <span style='color:pink'>" + d + "</span>";
    });

  var svg = d3.select('#trends')
    .append("svg")
    .attr("width", w)
    .attr("height", h + 40);

  var area = d3.area()
    .x(function(d, i) {
      return i * (w / 23);
    })
    .y0(h)
    .y1(function(d) {
      return h - d * 2;
    })


  var chartGroup = svg.append("g")
    .attr("transform", "translate(0,0)");

  //tips
  chartGroup.call(tip);

  // chartGroup.append("defs")
  // .data(trendsValue)
  //                   .append('pattern')
  //                     .attr('id', 'img')
  //                     .attr('patternUnits', 'userSpaceOnUse')
  //                     .attr('width', w / trendsValue.length)
  //                     .attr('height', h-50)
  //                    .append("image")
  //                     .attr("xlink:href", "sakuraimage.jpg")
  //                     .attr('width', w / trendsValue.length)
  //                     .attr('height', h-50);

  //bar
  chartGroup.selectAll("rect[class='barBackground']")
    .data(trendsValue)
    .enter()
    .append("rect")
    .attr("class", "barBackground")
    .attr("x", function(d, i) {
      return i * (w / trendsValue.length);
    })
    .attr("y", 50)
    .attr("width", w / trendsValue.length - barPadding)
    .attr("height", h - 50)
    // .attr("fill", "url(#img)");
    .attr("fill", function(d) {
      return '#F4F4F4';
    });

  //background bar
  chartGroup.selectAll("rect[class='bar']")
    .data(trendsValue)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d, i) {
      return i * (w / trendsValue.length);
    })
    .attr("y", function(d) {
      //return h - d;
      return h - (yScale(d));
    })
    .attr("width", w / trendsValue.length - barPadding)
    .attr("height", function(d) {
      //return d;
      return yScale(d);
    })
    .attr("fill", function(d) {
      var red = Math.min(Math.round(d) * 2, 255);
      var color = 'rgb(' + red + ',20,80)';
      return color;
    })
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
  // .on('click', function(d) {
  //   console.log("The value is " + d);
  //   d3.select(this)
  //   	.attr("fill", "#BA194C")
  //   	.duration(1000);
  // })
  ;

  //area chart
  // chartGroup.append("path")
  //   .attr("fill", function(d) {
  //     return "#BA194C";
  //   })
  //   .attr("d", area(trendsValue));


  //bar text
  // chartGroup.selectAll("text")
  //   .data(trendsValue)
  //   .enter()
  //   .append("text")
  //   .text(function(d) {
  //     return d.toString();
  //   })
  //   .attr("text-anchor", "middle")
  //   .attr("x", function(d, i) {
  //     return i * (w / trendsValue.length) + (w / trendsValue.length - barPadding) / 2;
  //   })
  //   .attr("y", function(d) {
  //     return h - d + 10;
  //   })
  //   .attr("font-family", "sans-serif")
  //   .attr("font-size", "11px")
  //   .attr("fill", "white");


  //xAxis
  chartGroup.append("g")
    .attr("class", "x axis hidden")
    .attr("transform", "translate(0," + 310 + ")")
    .call(xAxis);
}



//api
var app = {

  flickrData: [],

  initialize: function() {
    app.getFlickrData();
    app.getGeoData();
    // app.getWeaData();
    app.getTrendsData();
  },

  //Get flickr data
  getFlickrData: function(currentWord) {
    var flickrURL = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&nojsoncallback=1&extras=url_o&text=";
    var currentSearchWord = "sakura";
    var myFlickrKey = '&api_key=' + '56344bee499f9ea74bf9e109cc6ddaef';

    var flickrReqURL = flickrURL + currentSearchWord + myFlickrKey;

    $.ajax({
      url: flickrReqURL,
      type: 'GET',
      dataType: 'json',
      error: function(err) {
        console.log(err);
      },
      success: function(data) {
        console.log("get flickr data");
        // console.log(data);
        var tempFlickrData = data.photos.photo;
        // console.log(tempFlickrData);

        for (var i = 0; i < tempFlickrData.length; i++){
				//	debugger;
					if (tempFlickrData[i].url_o){
						app.flickrData.push(tempFlickrData[i]);
					}
				}

        var html = '';
		for (var i = 0; i < 30; i++){
			html += "<img src='" + app.flickrData[i].url_o + "'/>";
		}
		$('#photos').html(html);

      }
    });
  },


  //Get city geolocation
  getGeoData: function() {
    console.log("Get City's Geo Data");
    var currentSearchWord = 'Nagasaki';
    var googleGeoURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + currentSearchWord + '&key=';
    var myNYKey = 'AIzaSyCi4A5xfx1LGumU5CgpYHja80JQbTdJrDY';
    var googleGeoReqURL = googleGeoURL + myNYKey;
    console.log(googleGeoReqURL);
    $.ajax({
      url: googleGeoReqURL,
      type: 'GET',
      dataType: 'json',
      error: function(err) {
        console.log("ERROR!");
      },
      success: function(data) {
        console.log(data);
      }
    });
  },

  //get weather forecast
  // getWeaData: function() {
  //   console.log("Get Weather Data");
  //   var searchLat = 'lat=32.7502856';
  //   var searchLon = '&lon=129.877667';
  //   var weatherURL = 'https://api.openweathermap.org/data/2.5/forecast?' + searchLat + searchLon + '&units=metric&appid=';
  //   var myNYKey = '864203ada58d1895ee918fd60a00e9c4';
  //   var weatherReqURL = weatherURL + myNYKey;
  //   console.log(weatherReqURL);
  //   $.ajax({
  //     url: weatherReqURL,
  //     type: 'GET',
  //     dataType: 'json',
  //     error: function(err) {
  //       console.log("ERROR!");
  //     },
  //     success: function(data) {
  //       console.log(data);
  //     }
  //   });
  // },

  //get trends dataType
  getTrendsData: function() {
    $.getJSON("trends.json", function(data) {
      // console.log(trendsData);
      // console.log(data.default.timelineData);
      trendsTime = _.map(data.default.timelineData, function(formattedAxisTime) {
        return formattedAxisTime.formattedAxisTime;
      });
      trendsValue = _.map(data.default.timelineData, function(value) {
        return value.value[0];
      });
      console.log(trendsTime);
      console.log(trendsValue);
      makeTrendsChart(trendsTime, trendsValue);
    })
  }



};
