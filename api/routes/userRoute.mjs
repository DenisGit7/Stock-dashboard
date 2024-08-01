import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.mjs";

const router = express.Router();

//Register new user

router.post("/register", async (req, res) => {
  try {
    if (!req.body.username || !req.body.password || !req.body.email) {
      return res.status(200).send({
        message: "Registration failed",
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = {
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      loginStatus: false,
    };

    const user = await User.create(newUser);

    return res.status(201).send(user);
  } catch (error) {
    console.log(error.message);

    res.status(500).send({ message: error.message + " Registration failed" });
  }
});

//login

router.post("/login", async (req, res) => {
  const username = req.body.username;

  const user = await User.findOne({ username: username }).exec();
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      return res.status(200).json(user);
    } else {
      return res.status(401).send({
        message: "Wrong credentials",
      });
    }
  } catch (error) {
    if (!user) {
      res.status(401).send({ message: "Wrong credentials" });
    } else {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  }
});

//Get user info by ID

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Add stock to the watchlist

router.put("/add/:id", async (req, res) => {
  try {
    if (!req.body.watchlist) {
      return res.status(200).send({
        message: console.log(req.body),
      });
    }
    const { watchlist } = req.body;
    const { id } = req.params;
    const user = await User.findById(id);
    user.watchlist.push(watchlist.toUpperCase());
    const updateWatchlist = user.watchlist;
    const result = await User.findByIdAndUpdate(id, {
      watchlist: updateWatchlist,
    });

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(result);
    return res.status(200).send({ message: "Watchlist updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Delete stock from watchlist
router.delete("/remove/:id/:stock", async (req, res) => {
  try {
    const { stock, id } = req.params;
    const user = await User.findById(id);

    if (user.watchlist.includes(stock.toUpperCase())) {
      const index = user.watchlist.indexOf(stock.toUpperCase());

      user.watchlist.splice(index, 1);
      const updateWatchlist = user.watchlist;

      const result = await User.findByIdAndUpdate(id, {
        watchlist: updateWatchlist,
      });
      if (!result) {
        return res.status(404).json({ message: "User not found" });
      }
    } else {
      return res.status(404).json({ message: "Stock not found" });
    }

    return res.status(200).send({ message: "Stock deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
