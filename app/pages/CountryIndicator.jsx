import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from '../pages/Page';
import CountryIndicatorContainer from '../containers/CountryIndicator';
import { handleFetchCountryIndicatorData } from '../modules/countryIndicators/sagas';
import { fetchCountryIndicatorData } from '../modules/countryIndicators/actions';
import { preloadDynamic, paramsHaveChanged } from '../utils/preloadDynamic';
import { getIndicatorInfo } from '../modules/countryIndicators/selectors';

export class CountryIndicator extends Component {
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

  getMetaData(data) {
    return {
      title: this.pageTitle(data),
      meta: this.pageMeta(data),
      link: this.pageLink()
    };
  }

  pageTitle = ({ country, indicator }) => {
    return `${country} - ${indicator} | EconomicData.co`;
  };

  pageMeta = ({ country, indicator }) => {
    return [
      {
        name: 'description',
        content: `${country} - ${indicator} data history. No registration, free download to csv.`
      }
    ];
  };

  pageLink = () => {
    return [];
  };

  renderPageIfCountryAndIndicatorAvailable = () => {
    let theContainer = (<div />);
    if (this.props.indicatorInfo) {
      const { country, indicator } = this.props.indicatorInfo;
      if (country && indicator) {
        theContainer = (
          <Page {...this.getMetaData({country, indicator})}>
            <CountryIndicatorContainer {...this.props} />
          </Page>
        );
      }
    }
    return theContainer;
  };

  render() {
    return this.renderPageIfCountryAndIndicatorAvailable();
  }
}

function mapStateToProps(state) {
  return {
    indicatorInfo: getIndicatorInfo(state)
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
