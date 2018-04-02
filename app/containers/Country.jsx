import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BackgroundImage from '../images/fx.jpeg';
import CountryIndicatorInfo from '../components/CountryIndicatorInfo';
import CountryIndicatorSelection from '../components/CountryIndicatorSelection';
// import classNames from 'classnames/bind';
// import { createTopic, typing, incrementCount,
//  decrementCount, destroyTopic } from '../actions/topics';
// import styles from '../css/components/country.css';

// const cx = classNames.bind(styles);

class Country extends Component {
  render() {
    const { changeCountry, changeCountryIndicator, country, countries, countryIndicators, countryIndicator } = this.props;
    return (
      <section id="home">
        <div className="g-flex-centered g-min-height-500--md g-bg-cover g-bg-pos-center g-bg-img-hero g-bg-black-opacity-0_5--after g-pt-110" style={{backgroundImage: `url(${BackgroundImage})`}}>
          <div className="container text-center g-z-index-1">
            <div className="row">
              <div className="col-lg-8 col-md-10 mx-auto">
                <CountryIndicatorSelection
                  country={country}
                  countries={countries}
                  countryIndicator={countryIndicator}
                  countryIndicators={countryIndicators}
                  changeCountry={changeCountry}
                  changeCountryIndicator={changeCountryIndicator}
                />
                <CountryIndicatorInfo
                  country={country}
                  indicator={countryIndicator}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Country.propTypes = {
  /*topics: PropTypes.array.isRequired,
  typing: PropTypes.func.isRequired,
  createTopic: PropTypes.func.isRequired,
  destroyTopic: PropTypes.func.isRequired,
  incrementCount: PropTypes.func.isRequired,
  decrementCount: PropTypes.func.isRequired,
  newTopic: PropTypes.string*/
};

function mapStateToProps(state) {
  return {
    /*topics: state.topic.topics,
    newTopic: state.topic.newTopic*/
  };
}

export default connect(mapStateToProps, { /*createTopic, typing, incrementCount, decrementCount, destroyTopic*/ })(Country);
