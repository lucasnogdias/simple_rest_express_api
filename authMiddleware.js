const jwt = require("jsonwebtoken");
const JWTSecret = require("./config");

const auth = (req, res, next) => {
  const authToken = req.headers['authorization'];
  if (authToken) {
    const token = authToken.split(' ')[1];
    jwt.verify(token, JWTSecret, (err, data) => {
      if (err) {
        res.status(401);
        res.json({err: "Invalid Credentials"});
      } else {
        req.token = token;
        req.loggedUser = {id: data.id, email: data.email};
        next();
      }
    })
  } else {
    res.status(401);
    res.json({err: "Invalid Token"});
  }
}

module.exports = auth;