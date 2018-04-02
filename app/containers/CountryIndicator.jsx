import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BackgroundImage from '../images/fx.jpeg';
import CountryIndicatorInfo from '../components/CountryIndicatorInfo';
import CountryIndicatorSelection from '../components/CountryIndicatorSelection';
import { setCountrySelected,
         setCountryIndicatorSelected } from '../actions/masterData';

class CountryIndicator extends Component {
  render() {
    const { indicatorData, setCountrySelected, setCountryIndicatorSelected,
      indicatorInfo, countries, countrySelectedIndicators,
      countrySelected } = this.props;
    const { country, indicator } = indicatorInfo;

    return (
      <section id="home">
        <div
          className="g-flex-centered g-min-height-500--md g-bg-cover g-bg-pos-center g-bg-img-hero g-bg-black-opacity-0_5--after g-pt-110"
          style={{backgroundImage: `url(${BackgroundImage})`}}>
          <div className="container text-center g-z-index-1">
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <CountryIndicatorSelection
                  country={countrySelected}
                  countries={countries}
                  countryIndicator={indicator}
                  countryIndicators={countrySelectedIndicators}
                  changeCountry={setCountrySelected}
                  changeCountryIndicator={setCountryIndicatorSelected}
                />
                <CountryIndicatorInfo
                  indicatorInfo={indicatorInfo}
                  indicatorData={indicatorData}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

CountryIndicator.propTypes = {
  indicatorData: PropTypes.arrayOf(
    PropTypes.shape({
      releaseDate: PropTypes.string.isRequired,
      actual: PropTypes.string.isRequired,
      forecast: PropTypes.string,
      previous: PropTypes.string
    })
  ).isRequired,
  indicatorInfo: PropTypes.shape({
    country: PropTypes.string.isRequired,
    countryDisplay: PropTypes.string.isRequired,
    indicator: PropTypes.string,
    indicatorDisplay: PropTypes.string,
    importance: PropTypes.string,
    source: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  countrySelectedIndicators: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  setCountrySelected: PropTypes.func.isRequired,
  setCountryIndicatorSelected: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    countrySelectedIndicators: state.masterData.countrySelectedIndicators,
    countrySelected: state.masterData.countrySelected,
    indicatorInfo: state.countryIndicator.indicatorInfo,
    indicatorData: state.countryIndicator.indicatorData,
    countries: state.masterData.countries
  };
}

export default connect(mapStateToProps,
  { setCountrySelected,
    setCountryIndicatorSelected })(CountryIndicator);
