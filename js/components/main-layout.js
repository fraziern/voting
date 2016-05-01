var React = require('react');
var QuestionList = require('./QuestionList');

class MainLayout extends React.Component {
  render() {
    return (
      <div className="main-layout">
        <div className="questions-header">
          <h1>Latest Polls</h1>
        </div>
        <QuestionList />
      </div>
    );
  }
}

// MainLayout.contextTypes = {
//   store: React.PropTypes.object
// };

module.exports = MainLayout;
