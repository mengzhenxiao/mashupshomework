//global var
var trendsTime;
var trendsValue;



//geojson
var width = 960,
  height = 700;

var svg = d3.select("#mapdata").append("svg")
  .attr("width", width)
  .attr("height", height);

var xym = d3.geo.albers();
var path = d3.geo.path().projection(xym);

//need to change
var color = d3.scaleThreshold()
  .domain([1514764800000, 1520640000000, 1521504000000, 1521936000000, 1522540800000, 1523318400000, 1524182400000, 1525219200000])
  //1-1,3-10,3-20,3-25,4-1,4-10,4-20,5-1
  .range(["#ea6575", "#ed7b89", "#f0929d", "#f3a8b1", "#f6bec5", "#f9d5d9", "#fcebed", "#E5E5E5"]);



// Set tooltips
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>City: </strong><span class='details'>" + d.properties.name + "<br><br></span>" + "<strong>First Bloom: </strong><span class='details'>" + d.properties.firstbloom +"</span>";
  })


svg.call(tip);

// Moving tooltips
// var fragment = document.createDocumentFragment();
// fragment.appendChild(document.getElementById('d3-tip'));
// document.getElementById('mapdata').appendChild(fragment);

xym.origin([134, 25])
xym.translate([350, 745])
xym.parallels([24.6, 43.6])
xym.scale(1980)

d3.json("updated_data.json", function(data) {

  //change date format
  data.features = data.features.map(function(d) {
    d.properties.firstbloom = new Date(d.properties.firstbloom).getTime();
    return d;
  });

  var blossomtime = {};

  data.features.forEach(function(d) {
    blossomtime[d.properties.name] = +d.properties.firstbloom;
  });
  data.features.forEach(function(d) {
    d.properties.firstbloom = blossomtime[d.properties.name];
    console.log(d.properties.firstbloom);
  });



  //draw
  svg.selectAll("path").data(data.features)
    .enter().append("path")
    .attr("d", path)
    .style("fill", function(d) {
      return color(blossomtime[d.properties.name]);
    })
    // tooltips
        .style("stroke","white")
        .style('stroke-width', 0.3)
        .on('mouseover',function(d){
          tip.show(d);

          d3.select(this)
            .style("opacity", 1)
            .style("stroke","white")
            .style("stroke-width",3);
        })
        .on('mouseout', function(d){
          tip.hide(d);

          d3.select(this)
            .style("opacity", 0.8)
            .style("stroke","white")
            .style("stroke-width",0.3);
        });
    // .on("mouseover", function(e) {
    //   tip.show(d);
    //   d3.select(this)
    //     .style("opacity", 1)
    //     .style("stroke", "white")
    //     .style("stroke-width", 3);
    // })
    // .on("mouseout", function(e) {
    //   tip.hide(d);
    //
    //   d3.select(this)
    //     .style("opacity", 0.8)
    //     .style("stroke", "white")
    //     .style("stroke-width", 0.3);
    // })



});





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
