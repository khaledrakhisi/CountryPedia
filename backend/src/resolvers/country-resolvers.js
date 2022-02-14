const axios = require("axios");

const { exchangeRate } = require("../util/exchangeRate");

const getCountryByName = async (args) => {
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${args.name}`);

    const countries = [];

    response.data.forEach((element, index) => {
      const currencies = [];
      for (const currencySymbol in element.currencies) {
        currencies.push({
          name: element.currencies[currencySymbol].name,
          symbol: element.currencies[currencySymbol].symbol,
          code: currencySymbol,
          exchangeRateToSEK: exchangeRate("SEK", currencySymbol),
        });
      }

      countries.push({
        id: index,
        fullName: element.name.official,
        population: element.population,
        currencies,
        flagUrl: element.flags.png,
      });
    });

    return countries;
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = {
  getCountryByName,
};
