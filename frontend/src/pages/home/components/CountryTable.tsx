import React from "react";

import { Country } from "../../../shared/interfaces/country";
import CountryItem from "./CountryItem";

import "./CountryTable.scss";

interface IProps {
  countries: Array<Country>;
}

const CountryTable: React.FunctionComponent<IProps> = ({ countries }) => {
  return (
    <div className="country-table">

      <div className="country-table-header">
        <div className="flag"></div>
        <div className="full-name">Full name</div>
        <div className="population">Pop.</div>
        <div className="currencies">Cur. / Rate</div>
      </div>

      <div className="country-table-seperator-solid" />

      {countries.map((country, i) => {
        return i < countries.length - 1 ? (
          <React.Fragment key={i}>
            <CountryItem {...country} />
            <div className="country-table-seperator-dotted" />
          </React.Fragment>
        ) : (
          <CountryItem key={i} {...country} />
        );
      })}
      
    </div>
  );
};

export default CountryTable;
