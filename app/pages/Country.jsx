import React, { Component } from 'react';
import { connect } from 'react-redux';
import Page from '../pages/Page';
import CountryContainer from '../containers/Country';
import { handleFetchCountryData } from '../modules/country/sagas';
import { fetchCountryData } from '../modules/country/actions';
import { preloadDynamic, paramsHaveChanged } from '../utils/preloadDynamic';
import { getCountry, getCountryDisplay } from '../modules/country/selectors';

class Country extends Component {
  componentWillMount() {
    preloadDynamic([
      {
        action: this.props.fetchCountryData,
        args: this.props.params
      }
    ]);
  }

  componentWillReceiveProps(nextProps) {
    if (paramsHaveChanged(this.props.params, nextProps.params)) {
      preloadDynamic([
        {
          action: this.props.fetchCountryData,
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

  pageTitle = ({ countryDisplay }) => {
    return `${countryDisplay} Indicators | EconomicData.co`;
  };

  pageMeta = ({ countryDisplay }) => {
    return [
      {
        name: 'description',
        content: `${countryDisplay} indicators. No registration, free download to csv.`
      }
    ];
  };

  pageLink = () => {
    return [];
  };

  renderPageIfCountryAvailable = () => {
    let theContainer = (<div />);
    const { countryDisplay } = this.props;
    if (countryDisplay) {
      theContainer = (
        <Page {...this.getMetaData({countryDisplay})}>
          <CountryContainer {...this.props} />
        </Page>
      );
    }
    return theContainer;
  };

  render() {
    return this.renderPageIfCountryAvailable();
  }
}

function mapStateToProps(state) {
  return {
    country: getCountry(state),
    countryDisplay: getCountryDisplay(state)
  };
}

function preloadStatic(countryInfo) {
  const { country } = countryInfo;
  return [
    [handleFetchCountryData, {payload: {country}}]
  ];
}
Country.preloadStatic = preloadStatic;

export default connect(mapStateToProps, {fetchCountryData})(Country);
