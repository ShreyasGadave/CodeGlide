import { getUser } from "../services/auth.service.js";

const AuthenticateToken = (req, res, next) => {
  try {
    // ✅ Read token from cookie OR Authorization header
    const cookieToken = req.cookies?.token;
    const authHeader = req.header("Authorization");

    const headerToken = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    const token = cookieToken || headerToken;

    // console.log("TOKEN =>", token);

    if (!token) {
      return res.status(401).json({ msg: "Please login" });
    }

    const user = getUser(token);

    if (!user) {
      return res.status(403).json({ msg: "Invalid token" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ msg: "Authentication error" });
  }
};

export { AuthenticateToken };