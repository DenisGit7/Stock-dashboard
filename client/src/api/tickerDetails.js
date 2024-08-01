require("dotenv").config();

import { restClient } from "@polygon.io/client-js";
const rest = restClient("POLYGON API KEY", "https://api.polygon.io");
let detailsToReturn = "";
async function getStockDetails(symbol) {
  await rest.reference
    .tickerDetails(symbol)
    .then((data) => {
      detailsToReturn = data;
    })
    .catch((e) => {
      console.error("An error happened:", e);
    });
  return detailsToReturn;
}

export default getStockDetails;
