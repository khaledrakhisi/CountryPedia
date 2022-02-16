import React, { useContext, useState } from "react";
import { useLazyQuery } from "react-apollo";
import { Link, RouteComponentProps } from "react-router-dom";
import Zoom from "@material-ui/core/Zoom";

import Button from "../../shared/components/UIElements/Button";
import FormInput from "../../shared/components/UIElements/FormInput";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import Modal from "../../shared/components/UIElements/Modal";
import { AuthContext } from "../../shared/context/Auth-context";
import { GET_COUNTRIES_BY_NAME } from "../../shared/graphql/queries";
import { Country } from "../../shared/interfaces/country";
import CountryTable from "./components/CountryTable";

import "./HomePage.scss";

interface IProps extends RouteComponentProps {}
interface IState {
  countryName: string;
  countries: Array<Country>;
  amount: number;
}

interface IMessageBox{
  title: string,
  message: string,
}

const HomePage: React.FunctionComponent<IProps> = ({ history }) => {
  const [state, setState] = useState<IState>({
    countryName: "Sweden",
    countries: [],
    amount: 1,
  });
  const [isExpanded, setIsExpanded] = useState<boolean>(false); 
  const [messagebox, setMessageBox] = useState<IMessageBox>({
    title: "",
    message: "",
  });
  const _authContext = useContext(AuthContext);

  // Fetching graphql data using useLazyQuery hook
  const [fetchCountries, { error, loading }] = useLazyQuery(
    GET_COUNTRIES_BY_NAME,
    {
      onCompleted: (data) => {
        let newCountries: Array<Country> = data.getCountryByName;

        // Add new Counties
        if (newCountries) {
          // Calculating SEK exchange once item is being added
          newCountries = calculateExchangeToSEK(newCountries, state.amount);

          // Sort countries
          let sortedCountries = [...state.countries, ...newCountries];
          sortedCountries = sortedCountries.sort((a, b) => {
            let fa = a.name.toLowerCase(),
                fb = b.name.toLowerCase();
        
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
          });

          setState((prev) => {
            return {
              ...state,
              // Appending new items in the array using js spread operator
              countries: sortedCountries,
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

    if (name === "amount") {
      // updating all exchange rate currencies using nested .map()
      const updatedCountries = calculateExchangeToSEK(state.countries, +value);

      // update the state
      setState({
        ...state,
        amount: +value,
        countries: updatedCountries,
      });

    } else {
      setState({
        ...state,
        [name]: value,
      });
    }
  };

  const eh_searchSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!_authContext.loggedinUser) {
      setMessageBox({
        title: "Login required!",
        message: "Dear user, Authentication needed! You have to login first.",
      })
      setIsExpanded(true);
      return;
    }

    const countryExist: Country | undefined = state.countries.find(country=>country.name.toLowerCase()===state.countryName.toLowerCase());
    if(countryExist){
      // TODO: show a message
      setMessageBox({
        title: "New Country",
        message: `Country '${countryExist.name}' is already exsist!`,
      })
      setIsExpanded(true);
      return;
    }

    fetchCountries({ variables: { name: state.countryName } });    

    setState({
      ...state,
      countryName: "",
    });    
  };

  const eh_calculateSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // updating all exchange rate currencies using nested .map()
    const updatedCountries = calculateExchangeToSEK(state.countries, state.amount);

    // update the state
    setState({
      ...state,
      countries: updatedCountries,
    });
  };

  const eh_close_button = () => {
    setIsExpanded(false);
  };

  return (
    <div className="home-page">
      <Modal
        show={isExpanded}
        OnCancelHandle={eh_close_button}
        header={messagebox.title}
        contentClass="modal_content"
        footerClass="modal_actions"
        // footer={<Button onClick={eh_close_button}>Close</Button>}
      >
        <div className="message-box">
          <div className="text">
            <span>{messagebox.message}</span>
          </div>
          <div className="buttons">
            <Button id="btn_ok" onClick={eh_close_button}>
              Okay
            </Button>
          </div>
        </div>
      </Modal>

      <Zoom in={true}>
        <div className="logo">
          <span className="first-word">
            Country<span className="second-word">Pedia</span>
          </span>
        </div>
      </Zoom>

      <div className="options">
        {_authContext.loggedinUser ? (
          <div
            className="login"
            onClick={() => {
              _authContext.logoff();
            }}
          >{`Signout ${_authContext.loggedinUser.name}`}</div>
        ) : (
          <Link className="login" to="/login">
            Login
          </Link>
        )}
      </div>

      <div className="error-message">{error && <div>{"No internet access or too many requests, " + error.message}</div>}</div>

      <form className="search-form" onSubmit={eh_searchSubmit}>
        {loading && <LoadingSpinner asOverlay={true} />}
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
          <Button id="add" isBlueStyle disabled={!state.countryName}>
            add
          </Button>
        </div>
      </form>

      <form className="search-form" onSubmit={eh_calculateSubmit}>
        <div className="number-box">
          <FormInput
            id="txt_currency_amount"
            label="SEK amount"
            type="number"
            value={state.amount.toString()}
            name="amount"
            onChange={eh_inputChange}
          />
        </div>
      </form>
      <CountryTable countries={state.countries} />
    </div>
  );
};

export default HomePage;
