import React, { PropTypes } from 'react';
var ChoicePanel = require('./ChoicePanel');
var ReactPieChart = require('./ReactPieChart');

require('../../css/style.scss');

class PollLayout extends React.Component {

  render() {

    const data = this.props.data;

    if (!data) {
      return (
        <div>Loading ... </div>
      );
    }

    return (
      <div className="poll-layout">
        <ChoicePanel data={data} dispatch={this.props.dispatch} />
        <ReactPieChart data={data} />
      </div>
    );
  }
}

PollLayout.PropTypes = {
  data: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

module.exports = PollLayout;
