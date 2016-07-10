import React, { PropTypes } from 'react';

class Choice extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(e) {
    e.preventDefault();
    this.props.handleAddVote(this.props.title);
  }

  render() {
    return (<li className="list-choice-item">
        <button type="button" onClick={this.handleClick} className="btn btn-primary btn-block">{this.props.title}</button>
      </li>);
  }
}

Choice.PropTypes = {
  handleAddVote: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  choice: PropTypes.object.isRequired
};

module.exports = Choice;
