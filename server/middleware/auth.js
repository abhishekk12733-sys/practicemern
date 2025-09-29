import jwt from "jsonwebtoken";

const verifytoken = (res, req, next) => {
  const token = req.headers["authorization"]?.spilt(" ")[1];
  if (!token) {
    res.status(403).json({ message: "no token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECERT);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "token not valid" });
  }
};
export default verifytoken;
