const axios = require("axios");

const exchangeRate = async (baseCurrency, distCurrency) => {
  try {
    const response = await axios.get(
      `https://freecurrencyapi.net/api/v2/latest?apikey=270ae3c0-8c0a-11ec-939f-8b032014e114&base_currency=${baseCurrency}`
    );

    return response.data.data[distCurrency];
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = {
  exchangeRate,
};
