import React from 'react';
import PropTypes from 'prop-types';
import sanitizeHtml from 'sanitize-html';
import CountryIndicatorLatestRelease from './CountryIndicatorLatestRelease';
import CountryIndicatorBio from './CountryIndicatorBio';

const CountryIndicatorInfo = ({ indicatorInfo, indicatorData }) => {
  const { countryDisplay, indicatorDisplay, description } = indicatorInfo;
  const [latest] = indicatorData;
  const sanitizedDescription = sanitizeHtml(description, {
    allowedTags: ['p', 'br']
  });
  return (
    <div className="card card-inverse rounded-0 g-mb-20 g-mt-15 ind-bio">
      <div className="card-block g-pa-15">
        <h1 className="g-font-weight-700 g-font-size-22 g-font-size-26--md">
          {countryDisplay} - {indicatorDisplay}
        </h1>
        <hr />
        <div className="row">
          <CountryIndicatorLatestRelease data={latest} />
          <CountryIndicatorBio data={indicatorInfo} />
        </div>
        <hr />
        <div
          className="desc"
          dangerouslySetInnerHTML={{__html: sanitizedDescription}}
        />
      </div>
    </div>
  );
};

CountryIndicatorInfo.propTypes = {
  indicatorInfo: PropTypes.shape({
    country: PropTypes.string.isRequired,
    countryDisplay: PropTypes.string.isRequired,
    indicator: PropTypes.string.isRequired,
    indicatorDisplay: PropTypes.string.isRequired,
    importance: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  indicatorData: PropTypes.arrayOf(
    PropTypes.shape({
      releaseDate: PropTypes.string.isRequired,
      actual: PropTypes.string.isRequired,
      forecast: PropTypes.string,
      previous: PropTypes.string,
    })
  ).isRequired
};

export default CountryIndicatorInfo;
