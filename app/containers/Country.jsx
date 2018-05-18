import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BackgroundImage from '../images/fx.jpeg';
import CountryIndicatorsList from '../components/CountryIndicatorsList';
import CountrySelection from '../components/CountrySelection';
import { fetchCountryData, buildIndicatorLink } from '../modules/country/actions';
import { getCountriesForSelect } from '../modules/masterData/selectors';
import { getCountry, getCountryIndicators,
  getCountryDisplay } from '../modules/country/selectors';
// import classNames from 'classnames/bind';
// import { createTopic, typing, incrementCount,
//  decrementCount, destroyTopic } from '../actions/topics';
// import styles from '../css/components/country.css';

// const cx = classNames.bind(styles);

const Country = ({ fetchCountryData, country, countryDisplay, countries,
  countrySelectedIndicators, buildIndicatorLink }) => {
  return (
    <section id="home">
      <div className="g-flex-centered g-min-height-500--md g-bg-cover g-bg-pos-center g-bg-img-hero g-bg-black-opacity-0_5--after g-pt-110" style={{backgroundImage: `url(${BackgroundImage})`}}>
        <div className="container text-center g-z-index-1">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <h1 className="g-font-weight-700 g-font-size-22 g-font-size-36--md g-color-white g-mb-20 text-justify">
                {countryDisplay} - Economic Data
              </h1>
              <CountrySelection
                country={country}
                countries={countries}
                changeCountry={fetchCountryData}
              />
              <CountryIndicatorsList
                countryIndicators={countrySelectedIndicators}
                buildIndicatorLink={buildIndicatorLink}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Country.propTypes = {
  fetchCountryData: PropTypes.func.isRequired,
  countrySelectedIndicators: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  country: PropTypes.string.isRequired,
  countryDisplay: PropTypes.string.isRequired,
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  buildIndicatorLink: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    countrySelectedIndicators: getCountryIndicators(state),
    country: getCountry(state),
    countryDisplay: getCountryDisplay(state),
    countries: getCountriesForSelect(state)
  };
}

export default connect(mapStateToProps,
  { buildIndicatorLink, fetchCountryData })(Country);
