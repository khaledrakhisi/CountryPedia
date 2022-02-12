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
    }
    type Currency {
        name: String!
        Abbreviation: String!
        exchangeRateToSEK: Int!
    }
`);

// type Mutation {
    //     updateCourseTopic(id: Int!, topic: String!): Course
    // }


module.exports = schema;