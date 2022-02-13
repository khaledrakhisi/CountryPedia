import { gql } from "apollo-boost";
import React, { useState } from "react";
import { useLazyQuery } from "react-apollo";

import Button from "../../shared/components/UIElements/Button";
import FormInput from "../../shared/components/UIElements/FormInput";

// import countries from "../../shared/data/countries";
import { Country } from "../../shared/interfaces/country";
import CountryTable from "./components/CountryTable";

import "./HomePage.scss";

interface IState {
  countryName: string;
  countries: Array<Country>;
}

const GET_COUNTRIES_BY_NAME = gql`
  query getCountryByName($name: String!) {
    getCountryByName(name: $name) {
      id
      fullName
      population
      currencies {
        name
        symbol
        code
        exchangeRateToSEK
      }
    }
  }
`;

const HomePage: React.FunctionComponent = () => {
  const [state, setState] = useState<IState>({
    countryName: "",
    countries: [],
  });

  const eh_inputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;

    setState({
      ...state,
      [name]: value,
    });
  };

  const [fetchCountries, { error, loading }] = useLazyQuery(
    GET_COUNTRIES_BY_NAME,
    {
      onCompleted: (data) => {
        console.log(data);

        setState((prev) => {
          return {
            ...state,
            countries: [...prev.countries, ...data.getCountryByName],
          };
        });
      },
    }
  );

  const eh_submit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    fetchCountries({ variables: { name: state.countryName } });

    try {
      setState({
        ...state,
        countryName: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="home-page">
      <div className="logo">LOGO</div>
      <form onSubmit={eh_submit}>
        <div className="search-area">
          <div className="text-box">
            <FormInput
              id="country_search"
              label="Enter the country name"
              type="text"
              value={state.countryName}
              name="countryName"
              onChange={eh_inputChange}
            />
          </div>
          <div className="add-button">
            <Button id="add" isBlueStyle>
              add
            </Button>
          </div>
        </div>
      </form>
      <CountryTable countries={state.countries} />
    </div>
  );
};

export default HomePage;
