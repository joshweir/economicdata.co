import React from 'react';
import PropTypes from 'prop-types';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.css';

const CountryIndicatorData =
({ indicatorData, onDownloadCSV, onLoadMore }) => {
  return (
    <div className="table-responsive g-mb-20">
      <BootstrapTable
        data={indicatorData}
        striped
        hover
        condensed
        bordered={false}
      >
        <TableHeaderColumn dataField="releaseDate" isKey dataAlign="left">Release Date</TableHeaderColumn>
        <TableHeaderColumn dataField="time" dataAlign="left">Time</TableHeaderColumn>
        <TableHeaderColumn dataField="actual" dataAlign="right">Actual</TableHeaderColumn>
        <TableHeaderColumn dataField="forecast" dataAlign="right">Forecast</TableHeaderColumn>
        <TableHeaderColumn dataField="previous" dataAlign="right">Previous</TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};

CountryIndicatorData.propTypes = {
  indicatorData: PropTypes.arrayOf(
    PropTypes.shape({
      releaseDate: PropTypes.string.isRequired,
      actual: PropTypes.string.isRequired,
      forecast: PropTypes.string,
      previous: PropTypes.string,
    })
  ).isRequired,
  onLoadMore: PropTypes.func.isRequired,
  onDownloadCSV: PropTypes.func.isRequired
};

export default CountryIndicatorData;
