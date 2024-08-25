require("dotenv").config();
// import.meta.env.POLY_API_KEY;
import { restClient } from "@polygon.io/client-js";
import { dateFormat } from "../helpers/chartHelpers.js";
const rest = restClient("POLYGON API KEY", "https://api.polygon.io");
let price = "";
// const time = new Date.now()
// const day = new Date().getDate()
// const month = new Date().getMonth()
// const year = new Date().getFullYear()
// const date= year.toString()+"-"+month.toString()+"-"+day.toString()

let today = new Date();

const currentDate = dateFormat(today);

// async function lastPrice(symbol) {
//   const response = await fetch(
//     `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${symbol}?apiKey=`
//   );
//   const price = await response.json();
//   console.log(price.ticker.min.c);
//   let priceToSend = 0;
//   if (price.ticker.min.c) priceToSend = price.ticker.min.c;
//   if (price.ticker.prevDay.c) priceToSend = price.ticker.prevDay.c;

//   // console.log(priceToSend);

//   return priceToSend;
// }
export const lastPrice = async (symbol) => {
  const response = await fetch(
    `https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/tickers/${symbol}?apiKey=${POLY_API_KEY}`
  );
  const price = await response.json();
  console.log(price.ticker.min.c);
  let priceToSend = 0;
  if (price.ticker.min.c) priceToSend = price.ticker.min.c;
  if (price.ticker.prevDay.c) priceToSend = price.ticker.prevDay.c;

  // console.log(priceToSend);

  return priceToSend;
};

export default lastPrice;
