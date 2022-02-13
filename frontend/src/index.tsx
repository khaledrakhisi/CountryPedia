import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import {ApolloClient} from "apollo-boost";
import {createHttpLink} from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "./index.css";

const client = new ApolloClient({
  link: createHttpLink({uri: "http://localhost:4000/graphql"}),
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
