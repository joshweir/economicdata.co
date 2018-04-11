import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const CountryIndicatorSelection = ({ country, countries, countryIndicator,
    countryIndicators, changeCountry, changeCountryIndicator }) => {
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="select2-wrapper trans g-mb-5">
          <Select
            id="country-select"
            options={countries}
            simpleValue
            name="country"
            value={country}
            onChange={changeCountry}
            searchable
            clearable={false}
            placeholder="Country.."
          />
        </div>
      </div>
      <div className="col-md-6">
        <div className="select2-wrapper trans g-mb-5">
          <Select
            id="indicator-select"
            options={countryIndicators}
            simpleValue
            name="indicator"
            value={countryIndicator}
            onChange={changeCountryIndicator}
            searchable
            clearable={false}
            placeholder="Indicator.."
          />
        </div>
      </div>
    </div>
  );
};

CountryIndicatorSelection.propTypes = {
  country: PropTypes.string.isRequired,
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    }).isRequired
  ).isRequired,
  countryIndicator: PropTypes.string.isRequired,
  countryIndicators: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    }).isRequired
  ).isRequired,
  changeCountry: PropTypes.func.isRequired,
  changeCountryIndicator: PropTypes.func.isRequired
};

export default CountryIndicatorSelection;
