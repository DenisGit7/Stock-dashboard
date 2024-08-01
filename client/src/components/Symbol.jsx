import React, { useEffect, useState } from "react";
import Axios from "axios";

const Symbol = (props, { changeList }) => {
  const [list, setList] = useState();

  function Remove(id, stock) {
    Axios.delete(`http://localhost:3000/users/remove/${id}/${stock}`).then(
      () => {
        console.log("deleted");
        console.log(changeList);
        changeList();
      }
    );
  }

  useEffect(() => {
    const items = props.watchlist.map((item) => {
      return (
        <div>
          <h1>{item}</h1>
          <button onClick={() => Remove(props._id, item)}>delete</button>
        </div>
      );
    });
    setList(items);
  }, []);

  return (
    <div>
      <div>{list}</div>
    </div>
  );
};

export default Symbol;
