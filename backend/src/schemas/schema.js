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
        code: String!
        symbol: String!
        exchangeRateToSEK: Float
    }
`);

// type Mutation {
    //     updateCourseTopic(id: Int!, topic: String!): Course
    // }


module.exports = schema;