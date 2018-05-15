import React from 'react';
import PropTypes from 'prop-types';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.css';

const CountryIndicatorData =
({ indicatorData, onLoadMore, moreToLoad, country, countryIndicator }) => {
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
      {moreToLoad &&
        <button
          className="btn btn-sm u-btn-outline-lightgray text-uppercase g-mb-15 g-color-grey load-more"
          onClick={onLoadMore}
        >Load more..</button>
      }
      <a
        className="btn btn-sm u-btn-outline-lightgray text-uppercase g-mb-15 g-color-grey dl-csv"
        title="Download to csv"
        href={`/download?country=${country}&indicator=${countryIndicator}`}
      >
        <i className="fa fa-download" />
      </a>
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
  moreToLoad: PropTypes.bool.isRequired,
  country: PropTypes.string.isRequired,
  countryIndicator: PropTypes.string.isRequired
};

export default CountryIndicatorData;
