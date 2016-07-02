import React, { PropTypes } from 'react';
import { Link } from 'react-router';

require('../../css/style.scss');

class LoginLayout extends React.Component {

  render() {

    return (
      <div className="login-layout">
        <a href="/auth/github">
          <button type="button" className="btn btn-default">
              <img src="/public/img/gh-mark-32px.png" alt="github logo" />
              <p>LOGIN WITH GITHUB</p>
          </button>
        </a>
      </div>
    );
  }
}

LoginLayout.PropTypes = {
  data: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

module.exports = LoginLayout;
