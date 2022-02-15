import React from "react";

import { Country } from "../../../shared/interfaces/country";
import CountryItem from "./CountryItem";

import "./CountryTable.scss";

interface IProps {
  countries: Array<Country>;
}

const CountryTable: React.FunctionComponent<IProps> = ({ countries }) => {
  const ITEM_DISPLAY_DELAY = 70;
  return (
    <div className="country-table">

      <div className="country-table-header">
        <div className="flag">Flag</div>
        <div className="full-name">Full name</div>
        <div className="population">Pop.</div>
        <div className="currencies">Cur.</div>
      </div>

      <div className="country-table-seperator-solid" />

      {countries.map((country, i) => {
        return i < countries.length - 1 ? (
          <React.Fragment key={country.name}>
            <CountryItem {...country} displayDelay={i*ITEM_DISPLAY_DELAY}/>
            <div className="country-table-seperator-dotted" />
          </React.Fragment>
        ) : (
          <CountryItem key={country.name} {...country} displayDelay={i*ITEM_DISPLAY_DELAY}/>
        );
      })}

    </div>
  );
};

export default CountryTable;
