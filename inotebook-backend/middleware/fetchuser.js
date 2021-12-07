var jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
  const token = req.headers.token1;

  if (!token) {
    return res.status(401).send({error:"Invalid token"});
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user=data.user
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).send({error:"Invalid token. Enter a valid token"});
  }
};

module.exports = fetchuser;
