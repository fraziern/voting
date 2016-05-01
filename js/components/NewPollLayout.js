var React = require('react');
// var actions = require('../NewpollActions');


// TODO input validation

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
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
    console.log(this.state);
    actions.addPoll(this.state.title, this.state.choices);
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
            <input type="text" onChange={this.handleTitleChange} className="form-control" id="inputTitle" placeholder="New Title" />
          </div>
          <div className="form-group">
            <label HTMLfor="inputChoices">Choices (comma-separated)</label>
            <input type="text" onChange={this.handleChoicesChange} className="form-control" id="inputChoice" placeholder="Choice 1, Choice 2" />
          </div>
          <button onClick={this.handleSubmit} className="btn btn-default">Create</button>
        </form>
      </div>
    );
  }
}

module.exports = MainLayout;
