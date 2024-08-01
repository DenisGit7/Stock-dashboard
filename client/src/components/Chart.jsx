import React, { useState, useEffect } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { formatData, dateFormat } from "../helpers/chartHelpers.js";
import { subMonths } from "date-fns";

import { FaCalendar } from "react-icons/fa6";
import { TbSquareRoundedLetterDFilled } from "react-icons/tb";
import { TbSquareRoundedLetterMFilled } from "react-icons/tb";
import { TbSquareRoundedLetterWFilled } from "react-icons/tb";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { addDays, subDays } from "date-fns";

const Chart = (props) => {
  const [btnD, setBtnD] = useState(true);
  const [btnW, setBtnW] = useState(false);
  const [btnM, setBtnM] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new subMonths(Date(), 20));

  const hancleClickD = () => {
    setBtnD(true);
    setBtnW(false);
    setBtnM(false);
    props.setInterval("day");
  };
  const hancleClickW = () => {
    setBtnD(false);
    setBtnW(true);
    setBtnM(false);
    props.setInterval("week");
  };
  const hancleClickM = () => {
    setBtnD(false);
    setBtnW(false);
    setBtnM(true);
    props.setInterval("month");
  };

  useEffect(() => {
    props.end(dateFormat(endDate));
  }, [endDate]);
  useEffect(() => {
    props.start(dateFormat(startDate));
  }, [startDate]);

  return (
    <>
      <div className="  p-4 my-24   ">
        <div className="flex-container-date">
          <div className="display-block mx-auto ">
            <h2 className="text-slate-400 text-center">Start</h2>
            <DatePicker
              label="Uncontrolled picker"
              className=" cursor-pointer text-gray-300  mx-auto text-center rounded-md bg-transparent border-2 border-lime-600 font-medium "
              selected={startDate}
              showIcon
              icon={
                <FaCalendar className="text-slate-400 ml-2 mt-1 cursor-pointer" />
              }
              onChange={(date) => setStartDate(date)}
              placeholderText="I have been cleared!"
              onKeyDown={(e) => {
                e.preventDefault();
              }}
              excludeDateIntervals={[
                { start: subDays(endDate, 0), end: addDays(new Date(), 5) },
              ]}
            />
          </div>
          <div className="flex-container  w-4/12   p-1 mx-auto text-center">
            <TbSquareRoundedLetterDFilled
              className={`flex-btns ${btnD ? `active` : ""} cursor-pointer `}
              onClick={hancleClickD}
            />
            <TbSquareRoundedLetterWFilled
              className={`flex-btns ${btnW ? `active` : ""} cursor-pointer`}
              onClick={hancleClickW}
            />
            <TbSquareRoundedLetterMFilled
              className={`flex-btns ${btnM ? `active` : ""} cursor-pointer`}
              onClick={hancleClickM}
            />
          </div>
          <div className="display-block mx-auto">
            <h2 className="text-slate-400 text-center">End</h2>
            <DatePicker
              className="cursor-pointer text-gray-300 text-center rounded-md bg-transparent border-2 border-lime-600 font-medium"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              placeholderText="I have been cleared!"
              showIcon
              icon={
                <FaCalendar className="text-slate-400 ml-2 mt-1 cursor-pointer" />
              }
              onKeyDown={(e) => {
                e.preventDefault();
              }}
              // excludeDateIntervals={[
              //   { start: subDays(new Date(), 1), end: addDays(new Date(), 5) },
              // ]}
            />
          </div>
        </div>

        <ResponsiveContainer width="100%" height="100%" aspect={2}>
          <AreaChart
            data={formatData(props.data)}
            width={730}
            height={400}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="rgb(101 163 13)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="100%"
                  stopColor="rgb(101 163 13)"
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="5 5"
              opacity={0.2}
              vertical={false}
            />
            <Area
              width={100}
              height={100}
              type="monotone"
              dataKey="value"
              stroke="rgb(101 163 13)"
              fill="url(#color)"
              fillOpacity={1}
              strokeWidth={1}
            />
            <h1>HELLO</h1>
            <Tooltip />
            <XAxis
              dataKey="date"
              height={30}
              tick={false}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke="#9ca3af"
              tickFormatter={(number) => `${number.toFixed(2)}`}
              axisLine={false}
              tickLine={false}
              tickCount={20}
              // domain={["auto", "auto"]}
              width={70}
              allowDecimals={true}
              unit="$"
              // label={{ value: "Price", angle: -90, position: "insideLeft" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Chart;
