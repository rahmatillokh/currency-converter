const axios = require("axios");

const currency = async (have, want, amount) => {
  const options = {
    method: "GET",
    url: "https://currency-converter-by-api-ninjas.p.rapidapi.com/v1/convertcurrency",
    params: {
      have: have,
      want: want,
      amount: amount,
    },
    headers: {
      "X-RapidAPI-Key": "e705394852msh32ca47283706601p1c70f9jsn233f5a4542f7",
      "X-RapidAPI-Host": "currency-converter-by-api-ninjas.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = currency;
