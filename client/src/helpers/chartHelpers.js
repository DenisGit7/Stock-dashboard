export const convertUnixTimeStampToDate = (unixTimeStamp) => {
  const ms = unixTimeStamp * 1;
  return new Date(ms).toLocaleDateString();
};

export const formatData = (data) => {
  return data.results.map((item, index) => {
    // console.log(convertUnixTimeStampToDate(item.t));
    return {
      value: parseFloat(item.c.toFixed(2)),
      date: convertUnixTimeStampToDate(item.t),
    };
  });
};

export const dateFormat = (date) => {
  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, "0");
  let day = String(date.getDate()).padStart(2, "0");
  let currentDate = `${year}-${month}-${day}`;

  return currentDate;
};

export default dateFormat;
