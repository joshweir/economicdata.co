import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BackgroundImage from '../images/fx.jpeg';
import CountryIndicatorData from '../components/CountryIndicatorData';
import CountryIndicatorInfo from '../components/CountryIndicatorInfo';
import CountryIndicatorSelection from '../components/CountryIndicatorSelection';
import { fetchCountryIndicators } from '../modules/masterData/actions';
import { fetchCountryIndicatorData, downloadCsvIndicatorData,
  loadMoreIndicatorData } from '../modules/countryIndicators/actions';
import { getCountryIndicatorsForSelect, getCountriesForSelect,
  getCountrySelected, getCountryIndicatorSelected } from '../modules/masterData/selectors';
import { getIndicatorData,
  getIndicatorInfo, getMoreToLoad } from '../modules/countryIndicators/selectors';

const CountryIndicator = ({ indicatorData, fetchCountryIndicators,
  indicatorInfo, countries, countrySelectedIndicators, countrySelected,
  fetchCountryIndicatorData, countryIndicatorSelected, downloadCsvIndicatorData,
  loadMoreIndicatorData, moreToLoad }) => {
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
                countryIndicator={countryIndicatorSelected}
                countryIndicators={countrySelectedIndicators}
                changeCountry={fetchCountryIndicators}
                changeCountryIndicator={fetchCountryIndicatorData}
              />
              <CountryIndicatorInfo
                indicatorInfo={indicatorInfo}
                indicatorData={indicatorData}
              />
              <CountryIndicatorData
                indicatorData={indicatorData}
                onDownloadCSV={downloadCsvIndicatorData}
                onLoadMore={loadMoreIndicatorData}
                moreToLoad={moreToLoad}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

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
  moreToLoad: PropTypes.bool.isRequired,
  countrySelected: PropTypes.string.isRequired,
  countryIndicatorSelected: PropTypes.string,
  fetchCountryIndicators: PropTypes.func.isRequired,
  fetchCountryIndicatorData: PropTypes.func.isRequired,
  downloadCsvIndicatorData: PropTypes.func.isRequired,
  loadMoreIndicatorData: PropTypes.func.isRequired
};

CountryIndicator.defaultProps = {
  countryIndicatorSelected: null
};

function mapStateToProps(state) {
  return {
    countrySelectedIndicators: getCountryIndicatorsForSelect(state),
    countrySelected: getCountrySelected(state),
    countryIndicatorSelected: getCountryIndicatorSelected(state),
    indicatorInfo: getIndicatorInfo(state),
    indicatorData: getIndicatorData(state),
    countries: getCountriesForSelect(state),
    moreToLoad: getMoreToLoad(state)
  };
}

export default connect(mapStateToProps,
  { fetchCountryIndicators,
    fetchCountryIndicatorData,
    downloadCsvIndicatorData,
    loadMoreIndicatorData })(CountryIndicator);
