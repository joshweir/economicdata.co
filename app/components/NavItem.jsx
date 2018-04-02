import React from 'react';
import { Link, IndexLink, withRouter } from 'react-router';

const NavItem = ({ index, onlyActiveOnIndex, to, children, router, ...props }) => {
  const isActive = router.isActive(to, onlyActiveOnIndex);
  const LinkComponent = index ? IndexLink : Link;

  return (
    <li className={`nav-item g-mr-10--lg g-mr-15--xl g-my-7 g-mb-0--lg ${isActive ? 'active' : ''}`}>
      <LinkComponent className="nav-link p-0" to={to} {...props}>{children}</LinkComponent>
    </li>
  );
};

export default withRouter(NavItem);
