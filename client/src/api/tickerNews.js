require("dotenv").config();

async function getTickerNews(symbol) {
  const response = await fetch(
    `https://api.polygon.io/v2/reference/news?ticker=${symbol}&limit=5&apiKey=POLYGON API KEY`
  );
  const news = await response.json();

  return news;
}

export default getTickerNews;
