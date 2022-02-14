import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import {ApolloClient} from "apollo-boost";
import {createHttpLink} from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { BrowserRouter } from "react-router-dom";
import { setContext } from 'apollo-link-context';

import App from "./App";

import "./index.css";

const httpLink = createHttpLink({uri: 'http://localhost:4000/graphql'});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache : new InMemoryCache()
  
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />    
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
