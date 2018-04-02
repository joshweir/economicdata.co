import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import _ from 'lodash';
import sanitizeHtml from 'sanitize-html';

const CountryIndicatorBio = ({ data }) => {
  const { country, countryDisplay, importance, source } = data;
  const sanitizedSource = sanitizeHtml(source, {
    allowedTags: ['b', 'i', 'em', 'strong', 'a'],
    allowedAttributes: {
      a: ['href', 'target']
    }
  });
  return (
    <div className="col-md-4 info">
      <div>
        <span className="l">Importance:</span>
        <span className={importance}>
          <i
            className="fa fa-flag"
            title={`${_.capitalize(importance)} Importance`} />
        </span>
      </div>
      <div>
        <span className="l">Country:</span>
        <span>
          <Link to={`/${country}`}>{countryDisplay}</Link>
        </span>
      </div>
      <div>
        <span className="l">Source:</span>
        <span
          className="source"
          dangerouslySetInnerHTML={{__html: sanitizedSource}}
        />
      </div>
    </div>
  );
};

CountryIndicatorBio.propTypes = {
  data: PropTypes.shape({
    country: PropTypes.string.isRequired,
    countryDisplay: PropTypes.string.isRequired,
    indicator: PropTypes.string.isRequired,
    indicatorDisplay: PropTypes.string.isRequired,
    importance: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired
};

export default CountryIndicatorBio;
