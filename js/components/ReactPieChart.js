var ReactPieChartD3 = require('./ReactPieChartD3');
var React = require('react');
var ReactDOM = require('react-dom');

// This is a container

// Much love to Jon Kaufman for this setup: http://jkaufman.io/react-d3-love/s

class ReactPieChart extends React.Component {
  componentDidMount () {
    console.log('D3 mounted!');
    ReactPieChartD3.create(this.getDOMNode(), this.getChartState());
  }

  componentDidUpdate () {
    console.log('D3 updated!');
    ReactPieChartD3.update(this.getDOMNode(), this.getChartState());
  }

  componentWillUnmount () {
    ReactPieChartD3.destroy(this.getDOMNode());
  }

  getChartState () {
    return {
      data: this.props.data,
    };
  }

  getDOMNode () {
    return ReactDOM.findDOMNode(this);
  }

  render () {
    return <div className="pie-chart-container"></div>;
  }
}

module.exports = ReactPieChart;
