var d3 = require('d3');
var ReactPieChartD3 = {};
var svg, html;

var width = 360;
var height = 360;

/* Initialization */
ReactPieChartD3.create = function (el, props) {
  props = props || {};
  // reference to svg element containing chart
  svg = d3.select(el).append('svg')
    .attr('class', 'pie-chart-d3')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

  // reference to html element containing text
  html = d3.select(el).append('ul')
    .attr('class', 'list-inline');

  this.update(el, props);
};

/* Update */
ReactPieChartD3.update = function (el, props) {
  var radius = Math.min(width, height) / 2;
  var data = props.data;
  if (!data) return;

  var color = d3.scale.category20b();

  var arc = d3.svg.arc()
    .outerRadius(radius);

  var pie = d3.layout.pie()
    .value(function(d) { return d.votes; })
    .sort(null);

  var path = svg.selectAll('path')
    .data(pie(data.choices));

  path.exit().remove();

  path.enter()
    .append('path');

  path.attr('d', arc)
    .attr('fill', function(d) {
      return color(d.data.title);
    });

  var keys = html.selectAll('li.key')
    .data(color.domain());

  keys.enter().append('li')
    .attr('class', 'key')
    .style('background', color)
    .text(function (d) {
      return d;
    });
};

/** Any necessary cleanup */
ReactPieChartD3.destroy = function () {};

module.exports = ReactPieChartD3;
