import React, { Component } from 'react';
import Page from '../pages/Page';
import LoginOrRegisterContainer from '../containers/LoginOrRegister';

class LoginOrRegister extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'Sign In | EconomicData.co';
  };

  pageMeta = () => {
    return [
      { name: 'description', content: 'Sign in to EconomicData.co' }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    return (
      <Page {...this.getMetaData()}>
        <LoginOrRegisterContainer {...this.props} />
      </Page>
    );
  }
}

export default LoginOrRegister;
