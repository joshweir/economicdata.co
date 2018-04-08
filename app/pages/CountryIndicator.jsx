import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from '../pages/Page';
import CountryIndicatorContainer from '../containers/CountryIndicator';
import { handleFetchCountryIndicatorData } from '../sagas/countryIndicators';
import { fetchCountryIndicatorData } from '../actions/countryIndicators';
import { preloadDynamic, paramsHaveChanged } from '../utils/preloadDynamic';

class CountryIndicator extends Component {
  componentWillMount() {
    preloadDynamic([
      {
        action: this.props.fetchCountryIndicatorData,
        args: this.props.params
      }
    ]);
  }

  componentWillReceiveProps(nextProps) {
    if (paramsHaveChanged(this.props.params, nextProps.params)) {
      preloadDynamic([
        {
          action: this.props.fetchCountryIndicatorData,
          args: nextProps.params
        }
      ]);
    }
  }

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
    if (this.country && this.indicator) {
      return (
        <Page {...this.getMetaData()}>
          <CountryIndicatorContainer {...this.props} />
        </Page>
      );
    } else {
      return (<div />);
    }
  }
}

function mapStateToProps(state) {
  return {
    masterData: state.masterData,
    indicatorInfo: state.countryIndicator.indicatorInfo,
    indicatorData: state.countryIndicator.indicatorData
  };
}

function preloadStatic(indicatorInfo) {
  const { country, indicator } = indicatorInfo;
  return [
    [handleFetchCountryIndicatorData, {payload: {country, indicator}}]
  ];
}
CountryIndicator.preloadStatic = preloadStatic;

export default connect(mapStateToProps, {fetchCountryIndicatorData})(CountryIndicator);
