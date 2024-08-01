async function favoriteCheck(symbol, data) {
  // console.log(data[0].watchlist);
  // console.log(symbol);
  let check = false;
  if (data[0].watchlist.includes(symbol)) {
    check = true;
  } else {
    check = false;
  }

  return check;
}

export default favoriteCheck;
