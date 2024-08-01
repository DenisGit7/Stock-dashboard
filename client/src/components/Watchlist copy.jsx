import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";

import lastPrice from "../api/lastPrice";
import favoriteCheck from "../helpers/favoriteCheck";
import addFav from "../helpers/watchlistHelpers";
import { Remove } from "../helpers/watchlistHelpers";

import { HiXCircle } from "react-icons/hi";

const Watchlist = ({
  addSymbol,
  searchValue,
  setAddSymbol,
  updateData,
  searchError,

  setFav,
}) => {
  const [userData, setUserData] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [price, setPrice] = useState();
  const [Symbol, setSymbol] = useState();
  const [list, setList] = useState();

  const id = "6679ae5a438962cbbede9a27";

  useEffect(() => {
    const fav = favoriteCheck(searchValue, userData);
    const promise = Promise.resolve(fav);

    promise.then((value) => {
      console.log(value);
      setFav(value);
    });
    fetchData();
  }, []);

  useEffect(() => {
    const fav = favoriteCheck(searchValue, userData);
    const promise = Promise.resolve(fav);

    promise.then((value) => {
      console.log(value);
      setFav(value);
    });
    mapData();
  }, [userData, searchValue]);

  async function fetchData() {
    await Axios.get(`http://localhost:3000/users/${id}`)
      .then((response) => {
        setUserData([response.data]);
      })

      .catch((error) => {});
  }
  useEffect(() => {
    function set() {
      console.log("here");

      const items = userData[0].watchlist;
      console.log(items);
      // for (let i = 0; i < 2; i++) {
      //   console.log("asdfs");
      // }
    }
    set();
    console.log("here");
  }, []);

  async function mapData() {
    const items = userData.map((item) => {
      return item.watchlist.map((sym) => {
        return (
          <div className="flex bg-slate-700 mt-1 mb-1 shadow-inner shadow-md text-center font-medium justify-center hover:scale-105 hover:bg-slate-600 rounded-md hover:font-bold">
            <h2
              className="cursor-pointer w-6/12 text-1xl text-center  rounded-md p-1 m-1 text-lime-600 size-full "
              onClick={() => updateData(sym)}
            >
              {sym}
            </h2>
            <span className="cursor-pointer w-6/12 text-1xl text-center   rounded-md p-1 m-1 text-lime-600 size-full"></span>

            {/* <h2>price:{await lastPrice(sym)}</h2> */}
            <HiXCircle
              className="cursor-pointer text-3xl  rounded-md p-1 m-1  text-slate-400 hover:scale-110 hover:text-rose-400"
              onClick={() => Remove(id, sym)}
            />
          </div>
        );
      });
    });

    setWatchlist(...items);
  }
  // console.log(data + "asfasfasfasfasfsf");

  if (addSymbol) {
    if (!searchError && !userData[0].watchlist.includes(searchValue)) {
      console.log(id, searchValue);
      addFav(id, searchValue, fetchData);

      setAddSymbol(false);
    } else if (!searchError && userData[0].watchlist.includes(searchValue)) {
      Remove(id, searchValue, fetchData);
    }
    setAddSymbol(false);
  }

  return (
    <div className="m-1  p-2">
      <h1 className="text-2xl decoration-8 text-lime-600 text-center font-extrabold tracking-widest leading-loose">
        WATCHLIST
      </h1>
      <div className="flex text-center justify-center">
        <h2 className="font-semibold  w-6/12 text-1xl text-center  rounded-md p-1 m-1  text-lime-600 size-full border-solid border-transparent border-2">
          Symbol
        </h2>
        <h2 className="font-semibold w-6/12 text-1xl text-center  rounded-md p-1 m-1  text-lime-600 size-full border-solid border-transparent border-2">
          Price
        </h2>
        <h2 className=" font-semibold text-3xl  rounded-md p-3 m-1 text-gray-600 border-solid border-transparent border-2 ">
          {" "}
        </h2>
      </div>
      {watchlist}
    </div>
  );
};

export default Watchlist;
