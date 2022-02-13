import { gql } from "apollo-boost";
import React, { useState } from "react";
import { useLazyQuery } from "react-apollo";

import Button from "../../shared/components/UIElements/Button";
import FormInput from "../../shared/components/UIElements/FormInput";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

// import countries from "../../shared/data/countries";
import { Country } from "../../shared/interfaces/country";
import CountryTable from "./components/CountryTable";

import "./HomePage.scss";

interface IState {
  countryName: string;
  countries: Array<Country>;
  amount: number;
}

const GET_COUNTRIES_BY_NAME = gql`
  query getCountryByName($name: String!) {
    getCountryByName(name: $name) {
      id
      fullName
      population
      flagUrl
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
    amount: 1,
  });

  // Fetching graphql data using useLazyQuery hook.😊
  const [fetchCountries, { error, loading }] = useLazyQuery(
    GET_COUNTRIES_BY_NAME,
    {
      onCompleted: (data) => {
        let newCountries: Array<Country> = data.getCountryByName;

        // Add new Counties
        if (newCountries) {
          // Calculating SEK exchange once item is being added
          newCountries = calculateExchangeToSEK(newCountries, state.amount);

          setState((prev) => {
            return {
              ...state,
              // Appending new items in the array using js spread operator
              countries: [...prev.countries, ...newCountries],
            };
          });
        }
      },
    }
  );

  const calculateExchangeToSEK = (items: Array<Country>, rateAmount: number) => {
    // Mutating all exchange rate currencies using nested .map()
    let updatedItems = items.map((item) => {
      return {
        ...item,
        currencies: item.currencies.map((currency) => {
          return {
            ...currency,
            exchange: rateAmount * currency.exchangeRateToSEK,
          };
        }),
      };
    });

    return updatedItems;
  };

  const eh_inputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    
    // if (name === "amount") {
    //   console.log(name);
    //   // Mutating all exchange rate currencies using nested .map()
    //   const updatedCountries = calculateExchangeToSEK(state.countries, +value);

    //   // update the state
    //   setState({
    //     ...state,
    //     countries: updatedCountries,
    //   });
    // }

    setState({
      ...state,
      [name]: value,
    });
  };

  const eh_searchSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
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

  const eh_calculateSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Mutating all exchange rate currencies using nested .map()
    const updatedCountries = calculateExchangeToSEK(
      state.countries,
      state.amount
    );

    // update the state
    setState({
      ...state,
      countries: updatedCountries,
    });
  };

  return (
    <div className="home-page">
      <div className="logo">LOGO</div>

      {loading && <LoadingSpinner asOverlay={true} />}

      <form className="search-form" onSubmit={eh_searchSubmit}>
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

        <div className="button">
          <Button id="add" isBlueStyle>
            add
          </Button>
        </div>
      </form>

      <form className="search-form" onSubmit={eh_calculateSubmit}>
        <div className="text-box">
          <FormInput
            id="currency_amount"
            label="SEK amount"
            type="number"
            value={state.amount.toString()}
            name="amount"
            onChange={eh_inputChange}
          />
        </div>

        <div className="button">
          <Button id="add">calc</Button>
        </div>
      </form>
      <CountryTable countries={state.countries} />
    </div>
  );
};

export default HomePage;
