import Axios from "axios";

export const addFav = async (id, stock, fetchData) => {
  await Axios.put(`http://localhost:3000/users/add/${id}`, {
    watchlist: stock,
  }).then(() => {
    fetchData(id);
  });
};

export const Remove = async (id, stock, fetchData) => {
  await Axios.delete(`http://localhost:3000/users/remove/${id}/${stock}`).then(
    () => {
      fetchData(id);
    }
  );
};

export default addFav;
