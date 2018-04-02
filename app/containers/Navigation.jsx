import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { logOut } from '../actions/users';
import styles from '../css/components/navigation';
import logo from '../images/logo-light.png';
import NavItem from '../components/NavItem';

const cx = classNames.bind(styles);

const Navigation = ({ user, logOut }) => {
    return (
      <header id="js-header" className="u-header u-header--sticky-top u-header--change-appearance"
              data-header-fix-moment="100">
        <div className="u-header__section u-header__section--dark g-bg-black-opacity-0_3 g-transition-0_3 g-py-20"
             data-header-fix-moment-exclude="g-bg-black-opacity-0_3 g-py-20"
             data-header-fix-moment-classes="g-bg-black-opacity-0_8 g-py-10">
          <nav className={`navbar navbar-expand-lg py-0 ${cx('navigation')}`} role="navigation">
            <div className="container g-pos-rel">
              <Link
                to="/"
                className={`js-go-to navbar-brand u-header__logo g-mr-60 ${cx('item', 'logo')}`}
                data-type="static">
                <img className="img-fluid u-header__logo-img u-header__logo-img--main" src={logo} alt="EconomicData.co" />
              </Link>
              <div id="navBar" className="collapse navbar-collapse w-100" data-mobile-scroll-hide="true">
                <div className="navbar-collapse align-items-center flex-sm-row">
                  <ul className="js-scroll-nav navbar-nav text-uppercase g-font-weight-700 g-font-size-13 g-py-20 g-py-0--lg">
                    <NavItem to="/" onlyActiveOnIndex index={true}>Data</NavItem>
                    <NavItem to="/about">About</NavItem>
                    { true && (user.authenticated ? (
                      <NavItem
                        onClick={logOut} to="/">Sign Out</NavItem>
                    ) : (
                      <NavItem to="/login">Sign In</NavItem>
                    ))}
                  </ul>
                </div>
              </div>

              <button className="navbar-toggler btn g-line-height-1 g-brd-none g-pa-0 g-pos-abs g-top-5 g-right-0" type="button"
                      aria-label="Toggle navigation"
                      aria-expanded="false"
                      aria-controls="navBar"
                      data-toggle="collapse"
                      data-target="#navBar">
                <span className="hamburger hamburger--slider">
                  <span className="hamburger-box">
                    <span className="hamburger-inner"></span>
                  </span>
                </span>
              </button>
            </div>
          </nav>
        </div>
      </header>
    );
};

Navigation.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { logOut })(Navigation);
