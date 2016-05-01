var React = require('react');

class Choice extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.addVote({
      type: 'ADD_VOTE',
      id: this.props.id,
      choice: this.props.choice
    });
  }

  render() {
    return (<li className="list-choice-item">
        <button type="button" onClick={this.handleClick} className="btn btn-primary btn-block">{this.props.choice}</button>
      </li>);
  }
}

module.exports = Choice;
