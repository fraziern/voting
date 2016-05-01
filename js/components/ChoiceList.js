import React, { PropTypes } from 'react';
var Choice = require('./Choice');


class ChoiceList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="choice-list list-group list-unstyled">
        {this.props.data.choices.map(function(el) {
          return (<Choice key={el.title} title={el.title} id={this.props.data.id} addVote={this.props.addVote} />);
        },this)}
      </ul>
    );
  }
}

ChoiceList.PropTypes = {
  data: PropTypes.object.isRequired,
  addVotes: PropTypes.func.isRequired
};

module.exports = ChoiceList;
