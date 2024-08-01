import React, { useState } from "react";
import { TbDeviceIpadHorizontalDollar } from "react-icons/tb";
import { MdAccountBox } from "react-icons/md";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaArrowDownUpAcrossLine } from "react-icons/fa6";

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [registerFailed, setRegisterFailed] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    setRegisterFailed(false);
    setRegistrationSuccess(false);

    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });

    console.log(userData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const register = await Axios.post(
        `http://localhost:3000/users/register`,
        userData
      );
      console.log(register.status);
      if (register.status == 200) {
        setRegisterFailed(true);
      }
      if (register.status == 201) {
        setRegistrationSuccess(true);
      }
      console.log(register.status);
    } catch {
      setRegisterFailed(true);
      console.log("error");
    }

    setUserData({ username: "", password: "", email: "" });
  };

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
          <div className="text-center mt-20"></div>
          <div className="text-center place-items-center w-full mt-20  ">
            <div
              className=" div1 inline-flex justify-center  w-10/12 mt-5 rounded-xl bg-gradient-to-r from-gray-800 from-30% via-slate-700 via-60% to-gray-800 to-90%
            shadow-slate-700/20  shadow-sm
              "
            >
              <div className=" rounded-xl">
                <MdAccountBox className="  text-6xl mr-8 decoration-8 text-lime-600 text-center font-extrabold tracking-widest" />
              </div>

              <h1 className="text-3xl decoration-8 text-lime-600 text-center font-extrabold tracking-widest leading-loose">
                Sing
              </h1>
              <h1 className="text-3xl decoration-8 text-slate-400 text-center font-extrabold tracking-widest leading-loose">
                up
              </h1>
            </div>
            <div
              className=" w-full text-center  grid place-items-center"
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
                  className="mt-5  p-2 text-center rounded-md border-lime-600 border-2 font-black bg-slate-700 text-slate-300"
                  type="password"
                  max={30}
                  name="password"
                  value={userData.password}
                />

                <input
                  onChange={handleChange}
                  placeholder="Email"
                  className="mt-5 mb-5 p-2 text-center rounded-md border-lime-600 border-2 font-black bg-slate-700 text-slate-300"
                  type="email"
                  name="email"
                  value={userData.email}
                />
                <button
                  className="text-3xl text-slate-900 mb-5 font-extrabold tracking-widest  bg-lime-800 text-center p-2  rounded-tr-2xl rounded-bl-2xl rounded-br-lg  rounded-tl-lg border-solid border-2 border-lime-700
            hover:bg-lime-700
            "
                >
                  Register
                </button>
              </form>
              {registerFailed ? (
                <h2 className="text-1xl  text-gray-400 text-center ">
                  Registration failed
                </h2>
              ) : (
                ""
              )}
              {registrationSuccess ? (
                <h2 className="text-1xl  text-gray-400 text-center ">
                  Registration completed
                </h2>
              ) : (
                ""
              )}
              <button
                onClick={() => {
                  navigate("/", {});
                }}
                className="text-2xl text-slate-900 mb-5 mt-10 font-extrabold tracking-widest  bg-lime-800 text-center p-2  rounded-tr-2xl rounded-bl-2xl rounded-br-lg  rounded-tl-lg border-solid border-2 border-lime-700
            hover:bg-lime-700
            "
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default Register;
