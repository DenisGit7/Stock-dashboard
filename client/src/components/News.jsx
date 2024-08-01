import React from "react";
import New from "./New.jsx";
const News = (props) => {
  const items = props.data.results.map((item, index) => {
    return <New {...item} index={index} />;
  });

  return (
    <div className="flex-container shadow-2xl justify-center ">{items}</div>
  );
};

export default News;
