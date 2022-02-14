import React from "react";

import { Country } from "../../../shared/interfaces/country";
import abbreviateNumber from "../../../utils/utils";

import "./CountryItem.scss";

interface IProps extends Country {}

const CountryItem: React.FunctionComponent<IProps> = ({flagUrl, fullName, population, currencies}) => {
  return (
    <div className="country-item">
      <div
        className="flag"
        style={{
          backgroundImage: `url("${flagUrl}")`,
        }}
      ></div>
      <div className="full-name">{fullName}</div>
      <div className="population">{abbreviateNumber(population)}</div>
      <div className="currencies">
        {currencies.map((currency, i) => {
          return (
            <div className="currency" key={i}>
              <div className="currency-code">
                {currency.code}
              </div>
              <div className="currency-exchange">{currency.exchange ? currency.exchange.toFixed(2) : 0.0}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CountryItem;
