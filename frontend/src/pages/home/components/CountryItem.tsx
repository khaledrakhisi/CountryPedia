import React from "react";

import { Country } from "../../../shared/interfaces/country";

import "./CountryItem.scss";

const CountryItem: React.FunctionComponent<Country> = ({flagUrl, fullName, population, currencies}) => {
    return <div className="country-item">
        <div className="flag" style={{
              backgroundImage: `url("${flagUrl}")`,
          }}></div>
        <div className="full-name">{fullName}</div>
        <div className="population">{population}</div>
        <div className="currencies">{"Currencies"}</div>
    </div>;
}

export default CountryItem;