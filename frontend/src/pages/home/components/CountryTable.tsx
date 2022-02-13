import React from "react";

import { Country } from "../../../shared/interfaces/country";
import CountryItem from "./CountryItem";

import "./CountryTable.scss";

interface IProps {
  countries: Array<Country>;
}

const CountryTable: React.FunctionComponent<IProps> = ({ countries }) => {
    console.log(countries);
    
  return (
    <div className="country-table">
      <div className="country-table-header">
        <div className="flag">Flag</div>
        <div className="full-name">FullName</div>
        <div className="population">Population</div>
        <div className="currencies">Currencies</div>
      </div>
      <div className="country-table-seperator-solid" />
      {countries.map((country, i) => {
        return i < countries.length - 1 ? (
          <React.Fragment key={country.id}>
            <CountryItem {...country} />
            <div className="country-table-seperator-dotted" />
          </React.Fragment>
        ) : (
          <CountryItem key={country.id} {...country} />
        );
      })}
    </div>
  );
};

export default CountryTable;
