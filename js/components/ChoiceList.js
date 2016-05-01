var React = require('react');
var Choice = require('./Choice');


class ChoiceList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="choice-list list-group list-unstyled">
        {this.props.data.choices.map(function(el) {
          return (<Choice key={el.title} choice={el.title} id={this.props.data.id} addVote={this.props.addVote} />);
        },this)}
      </ul>
    );
  }
}

module.exports = ChoiceList;
