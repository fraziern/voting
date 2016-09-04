import React, { PropTypes } from 'react';
var ChoiceList = require('./ChoiceList');

class ChoicePanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var tweetLocation = 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(location.href);
    console.log(tweetLocation);

    return (
      <div className="choice-panel col-sm-6">
        <h2>{this.props.data.title}</h2>
        <h3>I would like to vote for...</h3>
        <ChoiceList data={this.props.data} authUser={this.props.authUser} dispatch={this.props.dispatch} />
        <a className="twitter-share-button" href={tweetLocation}><img src="/img/Twitter_Logo_Blue.svg" width="20" height="20"/> Tweet This Poll</a>
      </div>
    );
  }
}

ChoicePanel.PropTypes = {
  data: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

module.exports = ChoicePanel;
