import React, { PropTypes } from 'react';
var ChoicePanel = require('./ChoicePanel');
var ReactPieChart = require('./ReactPieChart');

require('../../css/style.scss');

class PollLayout extends React.Component {

  render() {
    // TODO: do we really need to pass these down at every level like this?
    const data = this.props.data;
    const authUser = this.props.authUser;

    if (!data) {
      return (
        <div>Loading ... </div>
      );
    }

    return (
      <div className="poll-layout row">
        <ChoicePanel data={data} authUser={authUser} dispatch={this.props.dispatch} />
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
