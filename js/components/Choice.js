var React = require('react');
var actions = require('../VotingActions');

class Choice extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    actions.updateVote(this.props.id, this.props.choice);
  }

  render() {
    return (<li className="list-choice-item">
        <button type="button" onClick={this.handleClick} className="btn btn-primary btn-block">{this.props.choice}</button>
      </li>);
  }
}

module.exports = Choice;
