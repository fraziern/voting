import React, { PropTypes } from 'react';
var ChoiceList = require('./ChoiceList');

class ChoicePanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="choice-panel col-sm-6">
        <h2>{this.props.data.title}</h2>
        <h3>I would like to vote for...</h3>
        <ChoiceList data={this.props.data} authUser={this.props.authUser} dispatch={this.props.dispatch} />
      </div>
    );
  }
}

ChoicePanel.PropTypes = {
  data: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

module.exports = ChoicePanel;
