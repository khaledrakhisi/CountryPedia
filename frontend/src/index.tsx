import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import {ApolloClient, gql} from "apollo-boost";
import {createHttpLink} from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import App from "./App";

import "./index.css";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache : new InMemoryCache()
});

client.writeData({
  data: {
    countries: [],
  }
})

// client.query({
//   query: gql`
//   {
//     getCountryByName(name: "sweden"){
//       id
//       fullName
//       population
//       currencies{
//         name
//         symbol
//         code
//         exchangeRateToSEK
//       }
//     }
//   }
//   `
// }).then((res)=>{
//   console.log(res);
// });

ReactDOM.render(
  <ApolloProvider client={client}>    
      <App />    
  </ApolloProvider>,
  document.getElementById("root")
);
