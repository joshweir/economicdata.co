import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer>
      <div className="g-color-gray-dark-v5 g-theme-bg-gray-dark-v3">
        <div className="container">
          <div className="text-center text-md-left g-brd-top g-brd-gray-dark-v2 g-py-40">
            <div className="row">
              <div className="col-md-6 d-flex align-items-center g-mb-15 g-mb-0--md">
                <p className="w-100 mb-0 js-scroll-nav">
                  <Link className="g-color-white" to="/about">About</Link>
                  <span className="link-spacer">|</span>
                  <Link className="g-color-white" to="/contact-us">Contact Us</Link>
                </p>
              </div>
              <div className="col-md-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
