import React, { PropTypes } from 'react';
// var ChoicePanel = require('./ChoicePanel');
// var ReactPieChart = require('./ReactPieChart');

require('../../css/style.scss');

class LoginLayout extends React.Component {

  render() {

    return (
      <div className="login-layout">
        This is the login screen.
      </div>
    );
  }
}

LoginLayout.PropTypes = {
  data: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

module.exports = LoginLayout;
