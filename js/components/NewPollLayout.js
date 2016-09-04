var React = require('react');
import { addPollAction } from '../actions';
import { connect } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import $ from 'jquery';

// TODO input validation
// TODO create a VisibleNewPollLayout

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

// TODO: handle async save errors

  handleSubmit(e) {
    const { dispatch, authUser } = this.props;
    console.log(this.state);
    // $('.spinner').removeClass('hidden');
    dispatch(addPollAction(this.state.title, this.state.choices, authUser))
      .then(() => {
        this.setState({title: '', choices: ''});
        // $('.spinner').addClass('hidden');
        $('.savestate').text('Saved!');
      });

    // transition to root
    // browserHistory.push('/');

    e.preventDefault();
  }

  render() {
    var submitButton;
    if (this.props.isSaving) {
      submitButton = <img className="spinner" src="/img/Floatingrays.gif" height="20" width="20" />;
    } else {
      submitButton = <button onClick={this.handleSubmit} className="submit btn btn-default">Create</button>;
    }

    return (
      <div className="newpoll-layout">
        <div className="newpoll-header">
          <h1>Create New Poll</h1>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="inputTitle">Title</label>
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
            <label htmlFor="inputChoice">Choices (comma-separated)</label>
            <input
              type="text"
              onChange={this.handleChoicesChange}
              className="form-control"
              id="inputChoice"
              placeholder="Choice 1, Choice 2"
              value={this.state.choices}
            />
          </div>
          <p className="savestate text-muted">Owner: {this.props.authUser}</p>
          {submitButton}
        </form>
      </div>
    );
  }
}

NewPollLayout.propTypes = {
  dispatch: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    polls: state.toJS().polls,
    authUser: state.toJS().authUser,
    isSaving: state.toJS().isSaving
  };
}

module.exports = connect(mapStateToProps)(NewPollLayout);
