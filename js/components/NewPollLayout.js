var React = require('react');
import { addPoll } from '../actions';
import { connect } from 'react-redux';

// TODO input validation

class NewPollLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {title: '', choices: ''};
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleChoicesChange = this.handleChoicesChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(e) {
    this.setState({title: e.target.value});
  }

  handleChoicesChange(e) {
    this.setState({choices: e.target.value});
  }

  handleSubmit(e) {
    const { dispatch } = this.props;
    console.log(this.state);
    dispatch(addPoll(this.state.title, this.state.choices));
    this.setState({title: '', choices: ''});
    e.preventDefault();
  }

  render() {
    return (
      <div className="newpoll-layout">
        <div className="newpoll-header">
          <h1>Create New Poll</h1>
        </div>
        <form>
          <div className="form-group">
            <label HTMLfor="inputTitle">Title</label>
            <input
              type="text"
              onChange={this.handleTitleChange}
              className="form-control"
              id="inputTitle"
              placeholder="New Title"
              value={this.state.title}
            />
          </div>
          <div className="form-group">
            <label HTMLfor="inputChoices">Choices (comma-separated)</label>
            <input
              type="text"
              onChange={this.handleChoicesChange}
              className="form-control"
              id="inputChoice"
              placeholder="Choice 1, Choice 2"
              value={this.state.choices}
            />
          </div>
          <button onClick={this.handleSubmit} className="btn btn-default">Create</button>
        </form>
      </div>
    );
  }
}

NewPollLayout.propTypes = {
  dispatch: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return { polls: state.toJS().polls };
}

module.exports = connect(mapStateToProps)(NewPollLayout);
