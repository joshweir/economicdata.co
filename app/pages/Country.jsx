import React, { Component } from 'react';
import Page from '../pages/Page';
import CountryContainer from '../containers/Country';

class Country extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return 'EconomicData.co | Download Free Economic Data for Forex';
  };

  pageMeta = () => {
    return [
      {
        name: 'description',
        content: 'No registration, free download to csv, a full history of economic data for a number of indicators accross a range of countries.'
      }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    return (
      <Page {...this.getMetaData()}>
        <CountryContainer {...this.props} />
      </Page>
    );
  }
}

export default Country;
