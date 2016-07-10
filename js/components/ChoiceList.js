import React, { PropTypes } from 'react';
var Choice = require('./Choice');
var AddNewChoiceForm = require('./AddNewChoiceForm');
import { addVoteAction } from '../actions';

class ChoiceList extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddVote = this.handleAddVote.bind(this);
  }

  handleAddVote(title) {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(addVoteAction(this.props.data.id, title));
  }

  render() {
    return (
      <ul className="choice-list list-group list-unstyled">
        {this.props.data.choices.map(function(el) {
          return (<Choice key={el.title} title={el.title} id={this.props.data.id} handleAddVote={this.handleAddVote} />);
        },this)}
        <AddNewChoiceForm />
      </ul>
    );
  }
}

ChoiceList.PropTypes = {
  data: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

module.exports = ChoiceList;
