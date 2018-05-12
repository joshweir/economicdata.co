import React from 'react';
import PropTypes from 'prop-types';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.css';

const CountryIndicatorData =
({ indicatorData, onDownloadCSV, onLoadMore, moreToLoad }) => {
  return (
    <div className="table-responsive g-mb-20">
      <BootstrapTable
        data={indicatorData}
        striped
        hover
        condensed
        bordered={false}
        tableStyle={{ marginBottom: '1rem' }}
      >
        <TableHeaderColumn
          dataField="releaseDate"
          isKey
          dataAlign="left"
          columnClassName="f r"
          className="f r"
        >Release Date</TableHeaderColumn>
        <TableHeaderColumn
          dataField="time"
          dataAlign="left"
          columnClassName="d-none d-md-block"
          className="d-none d-md-block"
        >Time</TableHeaderColumn>
        <TableHeaderColumn
          dataField="actual"
          dataAlign="right"
          columnClassName="val-col"
          className="val-col"
        >Actual</TableHeaderColumn>
        <TableHeaderColumn
          dataField="forecast"
          dataAlign="right"
          columnClassName="val-col"
          className="val-col"
        >Forecast</TableHeaderColumn>
        <TableHeaderColumn
          dataField="previous"
          dataAlign="right"
          columnClassName="val-col l"
          className="val-col l"
        >Previous</TableHeaderColumn>
      </BootstrapTable>
      <button
        className="btn btn-sm u-btn-outline-lightgray text-uppercase g-mb-15 g-color-grey"
        onClick={onLoadMore}
      >Load more..</button>
      <button
        className="btn btn-sm u-btn-outline-lightgray text-uppercase g-mb-15 g-color-grey"
        title="Download to csv"
        onClick={onDownloadCSV}
      >
        <i className="fa fa-download" />
      </button>
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
  onDownloadCSV: PropTypes.func.isRequired,
  moreToLoad: PropTypes.bool.isRequired
};

export default CountryIndicatorData;
