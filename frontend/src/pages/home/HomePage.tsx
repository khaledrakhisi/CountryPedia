import React from "react";

import Button from "../../shared/components/UIElements/Button";
import FormInput from "../../shared/components/UIElements/FormInput";
import CountryTable from "./components/CountryTable";

import countries from "../../shared/data/countries";

import "./HomePage.scss";

const HomePage: React.FunctionComponent = () => {

  const eh_countrySearch = () => {};

  return (
    <div className="home-page">
      <div className="logo">LOGO</div>
      <div className="search-area">
        <div className="text-box">
          <FormInput
            id="country_search"
            label="Enter the country name"
            type="text"
            value=""
            name="countryName"
            onChange={eh_countrySearch}
          />
        </div>
        <div className="add-button">
          <Button id="add" isBlueStyle>add</Button>
        </div>
      </div>
      <CountryTable countries={countries}/>      
    </div>
  );
};

export default HomePage;
