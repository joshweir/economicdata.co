import React from 'react';
import PropTypes from 'prop-types';

const CountryIndicatorLatestRelease = ({ data }) => {
  const { releaseDate, actual, forecast, previous } = data;
  return (
    <div className="col-md-8 latest-rel">
      <div className="pull-left rel-dt">
        <span className="k">
          Latest Release
        </span>
        <span className="v">
          {releaseDate}
        </span>
      </div>
      <div className="pull-right vals">
        <div className="pull-left rel-a">
          <span className="k">
            Actual
          </span>
          <span className="v">
            {actual}
          </span>
        </div>
        <div className="pull-left rel-f">
          <span className="k">
            Forecast
          </span>
          <span className="v">
            {forecast}
          </span>
        </div>
        <div className="pull-left rel-p">
          <span className="k">
            Previous
          </span>
          <span className="v">
            {previous}
          </span>
        </div>
      </div>
    </div>
  );
};

CountryIndicatorLatestRelease.propTypes = {
  data: PropTypes.shape({
    releaseDate: PropTypes.string.isRequired,
    actual: PropTypes.string.isRequired,
    forecast: PropTypes.string,
    previous: PropTypes.string
  }).isRequired
};

export default CountryIndicatorLatestRelease;
