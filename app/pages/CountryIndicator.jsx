import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from '../pages/Page';
import CountryIndicatorContainer from '../containers/CountryIndicator';
import { handleFetchCountryIndicatorData } from '../modules/countryIndicators/sagas';
import { fetchCountryIndicatorData } from '../modules/countryIndicators/actions';
import { preloadDynamic, paramsHaveChanged } from '../utils/preloadDynamic';
import { getCountryDisplay,
  getCountryIndicatorDisplay } from '../modules/countryIndicators/selectors';

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

  pageTitle = ({ countryDisplay, indicatorDisplay }) => {
    return `${countryDisplay} - ${indicatorDisplay} | EconomicData.co`;
  };

  pageMeta = ({ countryDisplay, indicatorDisplay }) => {
    return [
      {
        name: 'description',
        content: `${countryDisplay} - ${indicatorDisplay} data history. No registration, free download to csv.`
      }
    ];
  };

  pageLink = () => {
    return [];
  };

  renderPageIfCountryAndIndicatorAvailable = () => {
    let theContainer = (<div />);
    const { countryDisplay, indicatorDisplay } = this.props;
    if (countryDisplay && indicatorDisplay) {
      theContainer = (
        <Page {...this.getMetaData({countryDisplay, indicatorDisplay})}>
          <CountryIndicatorContainer {...this.props} />
        </Page>
      );
    }
    return theContainer;
  };

  render() {
    return this.renderPageIfCountryAndIndicatorAvailable();
  }
}

function mapStateToProps(state) {
  return {
    countryDisplay: getCountryDisplay(state),
    indicatorDisplay: getCountryIndicatorDisplay(state)
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
