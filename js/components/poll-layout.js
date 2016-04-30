var React = require('react');
var ChoicePanel = require('./ChoicePanel');
var ReactPieChart = require('./ReactPieChart');

require('../../css/style.scss');

class PollLayout extends React.Component {
  render() {
    return (
      <div className="poll-layout">
        <ChoicePanel data={this.props.route.data[1]} />
        <ReactPieChart data={this.props.route.data[1]} />
      </div>
    );
  }
}

module.exports = PollLayout;
