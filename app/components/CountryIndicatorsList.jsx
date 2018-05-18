import React from 'react';
import PropTypes from 'prop-types';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.css';

const CountryIndicatorsList = ({ countryIndicators, buildIndicatorLink }) => {
  return (
    <div className="table-responsive g-mb-20">
      <BootstrapTable
        data={countryIndicators}
        striped
        hover
        condensed
        bordered={false}
        tableStyle={{ marginBottom: '1rem' }}
      >
        <TableHeaderColumn
          dataField="valueLabelAndCountry"
          isKey
          dataAlign="left"
          columnClassName="f r"
          className="f r"
          dataFormat={buildIndicatorLink}
        >Indicator</TableHeaderColumn>
        <TableHeaderColumn
          dataField="lastActual"
          dataAlign="left"
          columnClassName="val-col"
          className="val-col"
        >Last</TableHeaderColumn>
        <TableHeaderColumn
          dataField="lastReleaseDate"
          dataAlign="left"
          columnClassName="val-col"
          className="val-col"
        >Last Release</TableHeaderColumn>
        <TableHeaderColumn
          dataField="lastPrevious"
          dataAlign="left"
          columnClassName="val-col l"
          className="val-col l"
        >Previous</TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};

CountryIndicatorsList.propTypes = {
  countryIndicators: PropTypes.arrayOf(
    PropTypes.shape({
      valueLabelAndCountry: PropTypes.string.isRequired,
      lastReleaseDate: PropTypes.string.isRequired,
      lastActual: PropTypes.string.isRequired,
      lastPrevious: PropTypes.string,
    })
  ).isRequired,
  buildIndicatorLink: PropTypes.func.isRequired
};

export default CountryIndicatorsList;
