import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const CountrySelection = ({ country, countries, changeCountry,
  changeCountryIndicator }) => {
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
    </div>
  );
};

CountrySelection.propTypes = {
  country: PropTypes.string.isRequired,
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    }).isRequired
  ).isRequired,
  changeCountry: PropTypes.func.isRequired
};

export default CountrySelection;
