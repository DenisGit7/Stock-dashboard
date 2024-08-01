import React from "react";

const New = (props) => {
  return (
    <a href={props.article_url} target="_blank">
      <div className="flex-items  w-4/12  border-0 m-1 shadow-xl hover:scale-105">
        <div className="  ">
          <div className="w-fit">
            <h2 className="text-1xl  rounded-md p-1 m-1 text-lime-600 text-center">
              {props.publisher.name}
            </h2>
            <div className=" flex justify-center items-center">
              {" "}
              <img src={props.image_url} className="mt-1 mb-1 size-1/2 " />
            </div>
          </div>
          <p className="text-1xl  rounded-md p-3 m-1 text-gray-400 text-left truncate  ">
            {props.description}
          </p>
        </div>
      </div>
    </a>
  );
};

export default New;
