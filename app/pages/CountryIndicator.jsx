import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from '../pages/Page';
import CountryIndicatorContainer from '../containers/CountryIndicator';
import { handleFetchCountryIndicatorData } from '../sagas/countryIndicators';

class CountryIndicator extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle = () => {
    return `${this.country} - ${this.indicator} | EconomicData.co`;
  };

  pageMeta = () => {
    return [
      {
        name: 'description',
        content: `${this.country} - ${this.indicator} data history. No registration, free download to csv.`
      }
    ];
  };

  pageLink = () => {
    return [];
  };

  render() {
    const indicatorInfo = this.props.indicatorInfo;
    this.country = indicatorInfo.country;
    this.indicator = indicatorInfo.indicator;
    return (
      <Page {...this.getMetaData()}>
        <CountryIndicatorContainer {...this.props} />
      </Page>
    );
  }
}

function mapStateToProps(state) {
  return {
    masterData: state.masterData,
    indicatorInfo: state.countryIndicator.indicatorInfo,
    indicatorData: state.countryIndicator.indicatorData
  };
}

function preload(indicatorInfo) {
  const { country, indicator } = indicatorInfo;
  return [
    [handleFetchCountryIndicatorData, {payload: {country, indicator}}]
  ];
}
CountryIndicator.preload = preload;

export default connect(mapStateToProps, {})(CountryIndicator);
