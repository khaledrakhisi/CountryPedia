import React, { useContext, useState } from "react";
import { useLazyQuery } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";

import Button from "../../shared/components/UIElements/Button";
import FormInput from "../../shared/components/UIElements/FormInput";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Modal from "../../shared/components/UIElements/Modal";
import { AuthContext } from "../../shared/context/Auth-context";
import { GET_COUNTRIES_BY_NAME } from "../../shared/graphql/queries";
import { Country } from "../../shared/interfaces/country";
import CountryTable from "./components/CountryTable";

import "./HomePage.scss";

interface IProps extends RouteComponentProps{}
interface IState {
  countryName: string;
  countries: Array<Country>;
  amount: number;
}

const HomePage: React.FunctionComponent<IProps> = ({history}) => {
  const [state, setState] = useState<IState>({
    countryName: "",
    countries: [],
    amount: 1,
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const _authContext = useContext(AuthContext);

  // Fetching graphql data using useLazyQuery hook.
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

    if(!_authContext.loggedinUser){
      setIsExpanded(true);
      return;
    }

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

    // updating all exchange rate currencies using nested .map()
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

  // const eh_expand_button = () => {
  //   setIsExpanded(true);
  // };
  const eh_close_button = () => {
    setIsExpanded(false);
  };

  return (
    <div className="home-page">

      <Modal
        show={isExpanded}
        OnCancelHandle={eh_close_button}
        header="Login required!"
        contentClass="modal_content"
        footerClass="modal_actions"
        // footer={<Button onClick={eh_close_button}>Close</Button>}
      >
        <div className="message-box">
          <div className="text">
            <p>Authentication needed!</p>
            <p>You have to login first.</p>
          </div>
          <div className="buttons">
            <Button id="btn_ok" onClick={eh_close_button}>ok</Button>            
          </div>          
        </div>
      </Modal>


      <div className="logo"><span className="first-word">Country<span className="second-word">Pedia</span></span> </div>
   
      {loading && <LoadingSpinner asOverlay={true} />}
      {error && <div>{error.message}</div>}

      <form className="search-form" onSubmit={eh_searchSubmit}>
        <div className="text-box">
          <FormInput
            id="txt_country_search"
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
            id="txt_currency_amount"
            label="SEK amount"
            type="number"
            value={state.amount.toString()}
            name="amount"
            onChange={eh_inputChange}
          />
        </div>

        <div className="button">
          <Button id="btn_add" inverted>calc</Button>
        </div>
      </form>
      <CountryTable countries={state.countries} />
    </div>
  );
};

export default HomePage;
