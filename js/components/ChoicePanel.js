import React, { PropTypes } from 'react';
var ChoiceList = require('./ChoiceList');

class ChoicePanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="choice-panel">
        <h2>{this.props.data.title}</h2>
        <h3>I'd like to vote for...</h3>
        <ChoiceList data={this.props.data} addVote={this.props.addVote} />
      </div>
    );
  }
}

ChoicePanel.PropTypes = {
  data: PropTypes.object.isRequired,
  addVote: PropTypes.func.isRequired
};

module.exports = ChoicePanel;
