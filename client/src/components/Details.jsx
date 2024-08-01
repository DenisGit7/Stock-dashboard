import React from "react";
import lastPrice from "../api/lastPrice";
import { useEffect, useState } from "react";
const Details = (props) => {
  return (
    <div className="m-1  p-2">
      <h2 className="text-2xl decoration-8 text-lime-600 text-center font-extrabold tracking-widest leading-loose ">
        DETAILS
      </h2>

      <h2 className="text-1xl font-bold  rounded-md p-1 m-1 text-lime-600 text-center">
        Ticker
      </h2>
      <h2 className="text-1xl  rounded-md p-1 m-1 text-gray-400 text-center hover:scale-110">
        {props.data.results.ticker}
      </h2>
      <h2 className="text-1xl font-bold  rounded-md p-1 m-1 text-lime-600 text-center">
        Price
      </h2>
      <h2 className="text-1xl  rounded-md p-1 m-1 text-gray-400 text-center hover:scale-110">
        {props.price}
      </h2>

      <h2 className="text-1xl font-bold rounded-md p-1 m-1 text-lime-600 text-center">
        Name
      </h2>
      <h2 className="text-1xl  rounded-md p-1 m-1 text-gray-400 text-center hover:scale-110">
        {props.data.results.name}
      </h2>
      <h2 className="text-1xl font-bold rounded-md p-1 m-1 text-lime-600 text-center">
        Share Outstanding
      </h2>

      <h2 className="text-1xl  rounded-md p-1 m-1 text-gray-400 text-center hover:scale-110">
        {props.data.results.share_class_shares_outstanding}
      </h2>

      {props.data.results.description != undefined && (
        <>
          <h2 className="text-1xl font-bold rounded-md p-1 m-1 text-lime-600 text-center">
            Description
          </h2>
          <h2 className="text-1xl  rounded-md p-1 m-1 text-gray-400 text-center hover:scale-105">
            {props.data.results.description}
          </h2>
        </>
      )}
      {props.data.results.market_cap != undefined && (
        <>
          <h2 className="text-1xl  rounded-md p-1 m-1 text-lime-600 text-center">
            Market Cap
          </h2>
          <h2 className="text-1xl  rounded-md p-1 m-1 text-gray-400 text-center hover:scale-110">
            {props.data.results.market_cap}
          </h2>
        </>
      )}
    </div>
  );
};

export default Details;
