import React from "react";

import { Country } from "../../../shared/interfaces/country";
import abbreviateNumber from "../../../utils/utils";

import "./CountryItem.scss";

interface IProps extends Country{
  exchangeAmount: number, 
}

const CountryItem: React.FunctionComponent<IProps> = ({flagUrl, fullName, population, currencies, exchangeAmount}) => {
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
              <div className="currency-code">{currency.code}/{currency.exchange}</div>
              {/* <div className="currency-exchange"></div> */}
            </div>
          );
        })}
      </div>
      {/* <div className="exchange">{exchanged}</div> */}
    </div>
  );
};

export default CountryItem;
