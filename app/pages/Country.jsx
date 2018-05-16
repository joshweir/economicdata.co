import React, { Component } from 'react';
import Page from '../pages/Page';
import CountryContainer from '../containers/Country';
import { preloadDynamic, paramsHaveChanged } from '../utils/preloadDynamic';

class Country extends Component {
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

  render() {
    return (
      <Page {...this.getMetaData()}>
        <CountryContainer {...this.props} />
      </Page>
    );
  }
}

export default Country;
