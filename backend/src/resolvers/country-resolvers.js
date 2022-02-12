const axios = require("axios");

const getCountryByName = async (args) => {
  try {
    const res = await axios.get(`https://restcountries.com/v3.1/name/${args.name}`);
    
    const coutries = [];
    res.data.forEach((element, index) => {
      const currencies = [];
      for (const property in element.currencies) {
        // console.log(`${property}: ${element.currencies[property]}`);
        currencies.push({
          symbol: property,
          name: element.currencies[property].name,
          exchangeRateToSEK: 209942,
        });
      }

      console.log(currencies);
      coutries.push({
        id: index,
        fullName: element.name.official,
        population: element.population,
        currencies: currencies,
      });
    });
    
    return coutries;

  } catch (err) {
    console.error(err);
  }
  
};

module.exports = {
  getCountryByName,
};
