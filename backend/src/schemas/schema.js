var {buildSchema} = require('graphql');

// GraphQL Schema
var schema = buildSchema(`
    type Query {
        getCountryByName(name: String): [Country]
    }    
    
    type Country {
        id: Int!
        fullName: String!
        population: Int!
        currencies: [Currency]
        flagUrl: String
    }
    type Currency {
        name: String!
        code: String!
        symbol: String!
        exchangeRateToSEK: Float
    }
`);

module.exports = schema;