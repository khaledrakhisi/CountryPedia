var {buildSchema} = require('graphql');

// GraphQL Schema
var schema = buildSchema(`
    type Query {
        getCountryByName(name: String): [Country]
        login(email: String, password: String): String
    }

    type User{
        id: ID!
        email: String!
        token: String!
        userName: String!        
    }
    
    type Country {
        id: Int!
        fullName: String!
        population: Int!
        currencies: [Currency]
        flagUrl: String
    }
    type Currency {
        name: String
        code: String
        symbol: String
        exchangeRateToSEK: Float
    }
`);

module.exports = schema;