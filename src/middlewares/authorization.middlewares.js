import jwt from "jsonwebtoken";
import AuthenticationRepository from "../repositories/user-repository/index.js";

export async function validateSessionByToken(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.sendStatus(401);

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const session = await AuthenticationRepository.findTokenByUser(token);
    res.locals.token = token;
    res.locals.data = data;
    res.locals.session = session;
    next();
  } catch (error) {
    return res.send(error).status(401);
  }
}
