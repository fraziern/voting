import React, { PropTypes } from 'react';
var ChoicePanel = require('./ChoicePanel');
var ReactPieChart = require('./ReactPieChart');

require('../../css/style.scss');

class PollLayout extends React.Component {

  render() {

    return (
      <div className="poll-layout">
        <ChoicePanel data={this.props.data} addVote={this.props.addVote} />
        <ReactPieChart data={this.props.data} />
      </div>
    );
  }
}

PollLayout.PropTypes = {
  data: PropTypes.object.isRequired,
  addVote: PropTypes.func.isRequired
};

module.exports = PollLayout;
