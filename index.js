const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const auth = require("./authMiddleware");
const JWTSecret = require("./config");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

let mockDB = {
  games: [
    {
      id: 23,
      title: "Hades",
      year: 2020,
      price: 25,
    },
    {
      id: 20,
      title: "Hollow Knight",
      year: 2018,
      price: 28,
    },
    {
      id: 2,
      title: "Metroid Dread",
      year: 2021,
      price: 55,
    },
  ],
  users: [
    {
      id: 1,
      name: "Lucas Dias",
      email: "some_test_email@email.com",
      password: "1234",
    },
    {
      id: 2,
      name: "Admin",
      email: "some_test_email2@email.com",
      password: "123456789",
    },

  ]
}

app.post("/auth", (req, res) => {
  let {email, password} = req.body;

  if (!email || !password) {
    res.status(400);
    res.json({err: 'Invalid email and/or password'});
  } else {
    let user = mockDB.users.find(u => u.email === email);
    if (!user) {
      res.status(404);
      res.json({err: `User not found`});
    } else {
      if (user.password === password) {
        jwt.sign({id: user.id, email: user.email}, JWTSecret, {expiresIn:'48h'}, (err, token) => {
          if (err) {
            res.status(500);
            res.json({err});
          } else {
            res.status(200);
            res.json({token});
          }
        });
      } else {
        res.status(401);
        res.json({err: "Invalid Credentials!"});
      }
    }
  }
});

app.get("/games", auth, (req, res) => {
  res.statusCode = 200;
  res.json(mockDB.games);
});

app.get("/game/:id", (req, res) => {
  let rawId = req.params.id;
  if (!isNaN(rawId)) {
    let id = parseInt(rawId);
    let game = mockDB.games.find(game => game.id === id);
    if (game) {
      res.statusCode = 200;
      res.json(game);
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(400);
  }
});

app.post("/game", auth, (req, res) => {
  let {title, price, year} = req.body;
  //TODO: should validate req data before proceeding
  mockDB.games.push({
    id: 1234,
    title,
    price,
    year,
  });
  res.sendStatus(200);
});

app.delete("/game/:id", auth, (req, res) => {
  let rawId = req.params.id;
  if (!isNaN(rawId)) {
    let id = parseInt(rawId);
    let index = mockDB.games.findIndex(game => game.id === id);
    if (index !== -1) {
      mockDB.games.splice(index, 1);
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(400);
  }
});

app.put("/game/:id", auth, (req, res) => {
  let rawId = req.params.id;
  if (!isNaN(rawId)) {
    let id = parseInt(rawId);
    let game = mockDB.games.find(game => game.id === id);
    if (game) {
      let {title, price, year} = req.body;
      if (title)
        game.title = title;
      if (price)
        game.price = price;
      if (year)
        game.year = year;
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(400);
  }
});

app.listen(1234, () => {
  console.log("API running");
})