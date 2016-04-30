var React = require('react');
var QuestionList = require('./QuestionList');

class MainLayout extends React.Component {
  render() {
    return (
      <div className="main-layout">
        <QuestionList data={this.props.route.data} />
      </div>
    );
  }
}

module.exports = MainLayout;
