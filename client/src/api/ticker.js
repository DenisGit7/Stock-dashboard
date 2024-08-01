require("dotenv").config();
// import "dotenv/config";
// import {} from "dotenv/config";
// import.meta.env.POLY_API_KEY;
// console.log(process.env);
// import apiKey from "./apiKey";
import { restClient } from "@polygon.io/client-js";

// const apiKey = async () => {
//   const key = await fetch("/api/key")
//     .then((response) => response.json())
//     .then((data) => {
//       const apiKey = data.apiKey;
//       console.log(apiKey);
//       return apiKey;
//     })
//     .catch((error) => console.log("Error fetching API key:", error));
//   console.log(key);
//   return key;
// };
// apiKey();
// console.log(key);
const rest = restClient("POLYGON API KEY", "https://api.polygon.io");
let dataToReturn = "";

async function getStockPrice(symbol, interval = "day", pastDate, currentDate) {
  console.log(interval);
  console.log(pastDate);
  await rest.stocks
    .aggregates(symbol, 1, interval, pastDate, currentDate)
    .then((data) => {
      if (data.resultsCount != 0) {
        dataToReturn = data;
      } else {
        dataToReturn = "error";
      }
    })
    .catch((e) => {
      console.error("An error happened:", e);
    });
  console.log(dataToReturn);
  return dataToReturn;
}

export default getStockPrice;
