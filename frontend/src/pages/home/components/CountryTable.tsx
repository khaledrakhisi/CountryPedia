import React from "react";

import { Country } from "../../../shared/interfaces/country";
import CountryItem from "./CountryItem";

import "./CountryTable.scss";

interface IProps {
  countries: Array<Country>,
  exchangeAmount: number,
}

const CountryTable: React.FunctionComponent<IProps> = ({ countries, exchangeAmount }) => {
    console.log(countries);
    
  return (
    <div className="country-table">
      <div className="country-table-header">
        <div className="flag">Fl.</div>
        <div className="full-name">Full name</div>
        <div className="population">Pop.</div>
        <div className="currencies">Cur./Exch.</div>
        {/* <div className="exchange">Exch.</div> */}
      </div>
      <div className="country-table-seperator-solid" />
      {countries.map((country, i) => {
        return i < countries.length - 1 ? (
          <React.Fragment key={i}>
            <CountryItem {...country} exchangeAmount={1}/>
            <div className="country-table-seperator-dotted" />
          </React.Fragment>
        ) : (
          <CountryItem key={i} {...country} exchangeAmount={exchangeAmount}/>
        );
      })}
    </div>
  );
};

export default CountryTable;
