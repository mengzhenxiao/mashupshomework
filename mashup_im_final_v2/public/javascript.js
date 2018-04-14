//global var
var trendsTime;
var trendsValue;



//D3 world map






//google trends visualization
function makeTrendsChart(trendsTime, trendsValue) {

  $('#trends').html('');

  var w = 1200;
  var h = 300;
  var barPadding = 2;

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



  //xAxis
  chartGroup.append("g")
    .attr("class", "x axis hidden")
    .attr("transform", "translate(0," + 310 + ")")
    .call(xAxis);
}



//api
var app = {

  initialize: function() {
    app.getGeoData();
    app.getTrendsData();
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
