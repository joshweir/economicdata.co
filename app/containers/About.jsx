import React from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/about';
import AboutImage from '../images/fx2.jpg';
import { Link } from 'react-router';

const cx = classNames.bind(styles);

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const About = () => {
  return (
    <section id="about">
      <div className="row mx-0">
        <div className="col-sm-7 col-md-6 text-center text-md-left g-theme-bg-gray-dark-v1 g-py-50 g-py-100--md g-px-15 g-px-50--md">
          <h3 className="text-uppercase g-font-weight-800 g-font-size-default g-color-white g-mb-25">About EconomicData.co</h3>
          <p className="g-mb-30 g-color-white">
            EconomicData.co provides you with a full, downloadable history of economic data for a number of indicators accross a range of countries for free - no registration, no strings attached, just download the data.
          </p>
          <p className="g-mb-30 g-color-white">It is hard to find a full history of data for economic data, some sites will provide you
            with back to a certain date but if you want the full history, you often need to pay. We don't see why you need to pay!
            Providing a range of economic indicators accross the countries and regions that make up the forex currency majors (ie. USA, Euro Zone, Great Britain, Canada, Australia, New Zealand), you can
            do your forex trading data analysis without having to jump through hoops to obtain the data.
          </p>
          <Link
            className="btn btn-lg u-btn-primary g-font-weight-700 g-font-size-12
              text-uppercase g-rounded-50 g-px-40 g-py-15"
            to="/contact-us"
          >Contact Us</Link>
        </div>

        <div className="col-sm-5 col-md-6 g-min-height-360 g-bg-img-about g-px-0" style={{backgroundImage: `url(${AboutImage})`}} />
      </div>
    </section>
  );
};

export default About;
