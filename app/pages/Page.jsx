import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const Page = ({ title, link, meta, children }) => {
  return (
    <div>
      <Helmet title={title} link={link} meta={meta} />
      { children }
    </div>
  );
};

Page.propTypes = {
  title: PropTypes.string,
  link: PropTypes.arrayOf(PropTypes.shape({})),
  meta: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    content: PropTypes.string
  }))
};

Page.defaultProps = {
  title: null,
  link: null,
  meta: null
};

export default Page;
