import React from 'react';
import './Table.css';
import numeral from "numeral";

function Table({ countries }) {
    return (
      <div className="table">
        {/*destructuring - for every country split it apart and get the country and cases to provide below*/}
        {/*loop through and create table for us */}
        {countries.map(({country, cases}) => (
          <tr>
            <td>{country}</td>
            <td><strong>{numeral(cases).format("0,0")}</strong></td>
          </tr>
        ))}            
    </div>
    );
}

export default Table;
