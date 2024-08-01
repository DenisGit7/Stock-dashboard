import React from "react";
import { useState, useEffect } from "react";
import Details from "../components/Details.jsx";
import Chart from "../components/Chart.jsx";
import News from "../components/News.jsx";
import Watchlist from "../components/Watchlist.jsx";
import lastPriceWL from "../api/lastPriceWL.js";

import getStockPrice from "../api/ticker.js";
import getStockDetails from "../api/tickerDetails.js";
import getTickerNews from "../api/tickerNews.js";

import { MdFavorite } from "react-icons/md";
import { IoSearchCircleSharp } from "react-icons/io5";
import { TbDeviceIpadHorizontalDollar } from "react-icons/tb";

import { subMonths } from "date-fns";
import { dateFormat } from "../helpers/chartHelpers.js";
import lastPrice from "../api/lastPrice.js";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = location.state;
  console.log(id);

  const [dataToChart, setDataToChart] = useState();
  const [dataToDetails, setDataToDetails] = useState();
  const [dataToNews, setDataToNews] = useState();
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("SPY");
  const [addSymbol, setAddSymbol] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [symbolPrice, setSymbolPrice] = useState();
  const [fav, setFav] = useState();
  const [interval, setInterval] = useState("day");
  const [startDate, setStartDate] = useState(
    dateFormat(new subMonths(Date(), 20))
  );
  const [endDate, setEndDate] = useState(dateFormat(new Date()));
  const [price, setPrice] = useState();

  useEffect(() => {
    const updateInital = async (stock) => {
      let chartFromApi = await getStockPrice(
        stock,
        interval,
        startDate,
        endDate
      );
      let detailsFromApi = await getStockDetails(stock);
      let newsFromApi = await getTickerNews(stock);

      setDataToNews(newsFromApi);
      setDataToChart(chartFromApi);
      setDataToDetails(detailsFromApi);
      setLoading(true);
    };

    getPrice(searchValue);
    updateInital(searchValue);
  }, []);

  function updateFromWL(sym) {
    updateData(sym, interval, startDate, endDate);
  }

  useEffect(() => {
    updateData(searchValue, interval, startDate, endDate);
  }, [interval, startDate, endDate]);

  const updateData = async (
    stock = searchValue,
    interval,
    startDate,
    endDate
  ) => {
    let chartFromApi = await getStockPrice(stock, interval, startDate, endDate);
    if (chartFromApi == "error") {
      setSearchError(true);
      setSearchValue("Not Found");
      return;
    } else {
      setSearchError(false);
      let detailsFromApi = await getStockDetails(stock);
      let newsFromApi = await getTickerNews(stock);
      setDataToNews(newsFromApi);
      setDataToDetails(detailsFromApi);
      setDataToChart(chartFromApi);
      setSearchValue(stock);
      getPrice(stock);
    }
  };
  function getPrice(symbol) {
    const p = lastPriceWL(symbol);
    const promise = Promise.resolve(p);
    promise.then((value) => {
      setPrice(value);
    });
  }
  function handleClick(event) {
    event.preventDefault();
    getPrice(searchValue);

    updateData(searchValue, interval, startDate, endDate);
  }

  return (
    <>
      <body className=" bg-gray-800 w-full">
        <div className="w-full">
          <div class="parent place-items-center w-full ">
            <div
              class=" div1 inline-flex justify-center  w-10/12 mt-5 rounded-xl bg-gradient-to-r from-gray-800 from-30% via-slate-700 via-60% to-gray-800 to-90%
            shadow-slate-700/20  shadow-sm
              "
            >
              <div
                className=" inline w-fit absolute start-10
               "
              >
                {" "}
                <button
                  onClick={() => {
                    navigate("/", {});
                  }}
                  className=" text-2xl text-slate-900  font-extrabold tracking-widest  bg-lime-800 text-center p-2  rounded-tr-2xl rounded-bl-2xl rounded-br-lg  rounded-tl-lg border-solid border-2 border-lime-700
            hover:bg-lime-700
            "
                >
                  Logout
                </button>
              </div>

              <div className=" rounded-xl">
                <TbDeviceIpadHorizontalDollar class="  text-6xl mr-8 decoration-8 text-lime-600 text-center font-extrabold tracking-widest" />
              </div>

              <h1 class="text-3xl decoration-8 text-lime-600 text-center font-extrabold tracking-widest leading-loose">
                Dash
              </h1>
              <h1 class="text-3xl decoration-8 text-slate-400 text-center font-extrabold tracking-widest leading-loose">
                Board
              </h1>
            </div>

            <div class="div2 text-center ">
              <div class="inline-flex">
                <input
                  className="rounded-md border-lime-600 border-2 p-1 m-1 text-center  font-black bg-slate-700 text-slate-300"
                  type="text"
                  name="symbol"
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value.toUpperCase());
                  }}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleClick(e);
                    }
                  }}
                />
                <IoSearchCircleSharp
                  className="text-5xl text-slate-400 rounded-md p-1 m-1 cursor-pointer hover:text-lime-200 hover:scale-125"
                  onClick={(event) => {
                    handleClick(event);
                  }}
                />

                {fav ? (
                  <MdFavorite
                    className="text-5xl  rounded-md p-1 m-1 text-rose-500 cursor-pointer hover:scale-125"
                    onClick={() => {
                      setAddSymbol(true);
                    }}
                  />
                ) : (
                  <MdFavorite
                    className="text-5xl  rounded-md p-1 m-1 text-slate-400 cursor-pointer hover:scale-125 hover:text-rose-400"
                    onClick={() => {
                      setAddSymbol(true);
                    }}
                  />
                )}
              </div>
            </div>
            <div class="div3">
              {loading && (
                <Chart
                  data={dataToChart}
                  setInterval={setInterval}
                  start={setStartDate}
                  end={setEndDate}
                />
              )}
            </div>
            <div class="div4 ">
              {loading && <Details data={dataToDetails} price={price} />}
            </div>
            <div class="div5">
              {loading && (
                <>
                  <Watchlist
                    addSymbol={addSymbol}
                    setAddSymbol={setAddSymbol}
                    searchValue={dataToDetails.results.ticker}
                    updateData={updateFromWL}
                    searchError={searchError}
                    data={dataToChart}
                    price={symbolPrice}
                    setFav={setFav}
                    id={id}
                  />
                </>
              )}
            </div>
            <div class="div6"> {loading && <News data={dataToNews} />}</div>
          </div>
        </div>
      </body>
    </>
  );
};

export default Dashboard;
