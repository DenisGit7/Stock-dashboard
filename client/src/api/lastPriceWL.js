require("dotenv").config();
// import.meta.env.POLY_API_KEY;

import { restClient } from "@polygon.io/client-js";
import { dateFormat } from "../helpers/chartHelpers.js";

const rest = restClient("POLYGON API KEY", "https://api.polygon.io");

// https://polygon.io/docs/stocks/get_v2_aggs_ticker__stocksticker__prev

let price = "";
// const time = new Date.now()
// const day = new Date().getDate()
// const month = new Date().getMonth()
// const year = new Date().getFullYear()
// const date= year.toString()+"-"+month.toString()+"-"+day.toString()

let today = new Date();

const currentDate = dateFormat(today);

export const lastPriceWL = async (symbol) => {
  // let priceToSend = 0;
  const p = rest.stocks
    .previousClose(symbol)
    .then((data) => {
      console.log(data.results[0].c);
      const priceToSend = data.results[0].c;
      return priceToSend;
    })
    .catch((e) => {
      console.error("An error happened:", e);
    });
  console.log(p);
  return p;
};

export default lastPriceWL;
