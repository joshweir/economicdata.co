import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCountriesList } from '../actions/masterData';

class Startup extends Component {
  componentDidMount() {
    const { fetchCountriesList, countriesIndicators } = this.props;
    fetchCountriesList(countriesIndicators);
  }
  render() {
    return this.props.children;
  }
}

Startup.propTypes = {
  fetchCountriesList: PropTypes.func.isRequired,
  countriesIndicators: PropTypes.arrayOf(
    PropTypes.shape({
      country: PropTypes.string.isRequired,
      countryLabel: PropTypes.string.isRequired,
      indicators: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired
        })
      ).isRequired
    }).isRequired
  ).isRequired
};

function mapStateToProps(state) {
  return {
    countriesIndicators: state.masterData.countriesIndicators
  };
}

export default connect(mapStateToProps, {fetchCountriesList})(Startup);
