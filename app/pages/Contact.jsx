import React, { Component } from 'react';
import Page from '../pages/Page';
import ContactContainer from '../containers/Contact';

class Contact extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'Contact Us | EconomicData.co';
  };

  pageMeta = () => {
    return [
      { name: 'description', content: 'Get in touch with EconomicData.co' }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    return (
      <Page {...this.getMetaData()}>
        <ContactContainer {...this.props} />
      </Page>
    );
  }
}

export default Contact;
