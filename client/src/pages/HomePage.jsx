import React, { useEffect, useState } from "react";
import { TbDeviceIpadHorizontalDollar } from "react-icons/tb";
import { MdAccountBox } from "react-icons/md";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [id, setId] = useState("");

  const [credetialsError, setCredetialsError] = useState(false);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
    setCredetialsError(false);
    console.log(userData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const login = await Axios.post(
        `http://localhost:3000/users/login`,
        userData
      );
      console.log(login.data._id);
      setId(login.data._id);
      console.log(id);
      navToDash(login.data._id);
      console.log(login.data._id);
      setCredetialsError(false);
    } catch {
      setCredetialsError(true);
      console.log("error");
    }

    setUserData({ username: "", password: "" });
  };

  function navToDash(userID) {
    navigate("/home", { state: { id: userID } });
    setId("");
  }
  return (
    <>
      <body className=" bg-gray-800 w-full h-screen ">
        <div className="w-full bg-gray-800  ">
          <div className="text-center place-items-center w-full  ">
            <div
              className=" div1 inline-flex justify-center  w-10/12 mt-5 rounded-xl bg-gradient-to-r from-gray-800 from-30% via-slate-700 via-60% to-gray-800 to-90%
            shadow-slate-700/20  shadow-sm
              "
            >
              <div className=" rounded-xl">
                <TbDeviceIpadHorizontalDollar className="  text-6xl mr-8 decoration-8 text-lime-600 text-center font-extrabold tracking-widest" />
              </div>

              <h1 className="text-3xl decoration-8 text-lime-600 text-center font-extrabold tracking-widest leading-loose">
                Dash
              </h1>
              <h1 className="text-3xl decoration-8 text-slate-400 text-center font-extrabold tracking-widest leading-loose">
                Board
              </h1>
            </div>
          </div>
          <div className="text-center mt-20">
            <button
              onClick={() => {
                navigate("/register", {});
              }}
              className="text-3xl text-slate-900  font-extrabold tracking-widest  bg-lime-800 text-center p-2  rounded-tr-2xl rounded-bl-2xl rounded-br-lg  rounded-tl-lg border-solid border-2 border-lime-700
            hover:bg-lime-700
            "
            >
              Register
            </button>
          </div>
          <div className="text-center place-items-center mt-20  ">
            <div
              className=" div1 inline-flex justify-center  w-6/12 mt-5 rounded-xl bg-gradient-to-r from-gray-800 from-30% via-slate-700 via-60% to-gray-800 to-90%
            shadow-slate-700/20  shadow-sm
              "
            >
              <div className=" rounded-xl">
                <MdAccountBox className="  text-6xl mr-8 decoration-8 text-lime-600 text-center font-extrabold tracking-widest" />
              </div>

              <h1 className="text-3xl decoration-8 text-lime-600 text-center font-extrabold tracking-widest leading-loose">
                Sign
              </h1>
              <h1 className="text-3xl decoration-8 text-slate-400 text-center font-extrabold tracking-widest leading-loose">
                in
              </h1>
            </div>
            <div
              className=" w-full text-center grid  place-items-center"
              onSubmit={handleSubmit}
            >
              <form className="block w-2/12  mt-5">
                <input
                  onChange={handleChange}
                  placeholder="Username"
                  className="mt-5 p-2 text-center rounded-md border-lime-600 border-2 font-black bg-slate-700 text-slate-300"
                  type="text"
                  max={30}
                  name="username"
                  value={userData.username}
                />
                <input
                  onChange={handleChange}
                  placeholder="Password"
                  className="mt-5 mb-5 p-2 text-center rounded-md border-lime-600 border-2 font-black bg-slate-700 text-slate-300"
                  type="password"
                  max={30}
                  name="password"
                  value={userData.password}
                />
                <button
                  className="text-3xl   text-slate-900 mb-5 font-extrabold tracking-widest  bg-lime-800 text-center p-2  rounded-tr-2xl rounded-bl-2xl rounded-br-lg  rounded-tl-lg border-solid border-2 border-lime-700
            hover:bg-lime-700
            "
                >
                  Login
                </button>
              </form>
              {credetialsError ? (
                <h2 className="text-1xl  text-gray-400 text-center ">
                  Wrong credentials
                </h2>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default HomePage;
