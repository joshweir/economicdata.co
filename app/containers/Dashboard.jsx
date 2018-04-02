import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import Select from 'react-select';
import EntityTable from '../components/EntityTable';
import styles from '../css/components/dashboard.css';
//import { getEntityData, getEntities } from '../actions/dashboard';

const cx = classNames.bind(styles);

class Dashboard extends Component {
  render() {
    const { availableEntityTypes, level1Entity } = this.props;
    return (<div>
      {availableEntityTypes.map((entityType, key) => entityType)}
      <EntityTable data={level1Entity} />
    </div>);
  }
}

Dashboard.propTypes = {
  availableEntityTypes: PropTypes
    .arrayOf(PropTypes.string).isRequired,
  level1Entity: PropTypes.shape({
      name: PropTypes.string,
      selectedId: PropTypes.number
    }).isRequired
};

function mapStateToProps(state) {
  const { level1Entity, availableEntityTypes } = state.entity;
  return {
    level1Entity,
    availableEntityTypes
  };
}

// Read more about where to place `connect` here:
// https://github.com/rackt/react-redux/issues/75#issuecomment-135436563
export default connect(mapStateToProps, {})(Dashboard);
