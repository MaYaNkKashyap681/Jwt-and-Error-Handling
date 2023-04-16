const { use } = require("../routes/authroute");
const jwt = require("jsonwebtoken");
const { customError } = require("../errormaker.js");

const user = {
  id: "1234",
  name: "user",
  password: "1234",
};

module.exports.login = async (req, res, next) => {
  try {
    const { name, password } = req.body;
    if (name != user.name) 
      throw customError(404, "User does not exist");
    if (password != user.password)
      throw customError(401, "Invalid Credentials");

    const token = await jwt.sign({ id: user.id }, "red and blue ball", {
      expiresIn: "30s",
    });

    res.status(200).send(token);
  } catch (err) {
    next(err);
  }
};

module.exports.checker = async (req, res, next) => {
  try {
    const { auth } = req.headers;
    if (!auth) {
      throw customError(404, "You don't have token");
    }
    const _token = auth.split(" ")[1];
    console.log(_token);
    const isValid = await jwt.verify(_token, "red and blue ball");
    if (!isValid) {
      throw customError(498, "Token is not valid");
    }
    res.status(200).json({
      msg: "Token is Valid",
    });
  } catch (err) {
    next(err);
  }
};
