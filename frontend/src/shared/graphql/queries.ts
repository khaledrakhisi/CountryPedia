import { gql } from "apollo-boost";

export const GET_COUNTRIES_BY_NAME = gql`
  query getCountryByName($name: String!) {
    getCountryByName(name: $name) {
      id
      name
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