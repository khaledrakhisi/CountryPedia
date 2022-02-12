const axios = require("axios");

const getCountryByName = async (args) => {
  try {
    const res = await axios.get(
      `https://restcountries.com/v3.1/name/${args.name}`
    );
    //   console.log(res.data);
    const coutries = [];
    let r = null;
    res.data.forEach((element, index) => {
      const currencies = [];
      for (const property in element.currencies) {
        // console.log(`${property}: ${element.currencies[property]}`);
        currencies.push({
          Abbreviation : property,
          name: element.currencies[property].name,
          exchangeRateToSEK: 209942,
        });
      }
      r = {
        id: index,
        fullName: element.name.official,
        population: element.population,
        currencies: currencies,
      };
      console.log(currencies);
      coutries.push(r);
    });
    //   console.log(args);
    //   console.log("hereeeee", coutries);
    return coutries;
  } catch (err) {
    console.error(err);
  }
  // }
  // .catch((error) => {
  //   console.error(error);
  // });
};

module.exports = {
  getCountryByName,
};
