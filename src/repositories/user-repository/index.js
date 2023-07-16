import db from "../../database/mongo.js";


async function createUser(SignUp, hash) {
  return await db.collection("users").insertOne({ ...SignUp, password: hash });
}

async function findTokenByUser(token) {
  return db.collection("sessions").findOne({ token });
}

async function signin(_id) {
  return db.collection("users").findOne({ _id });
}

async function findUser(email) {
  return db.collection("users").findOne({ email });
}

async function createToken(user, token) {
  return db.collection("sessions").insertOne({
    userId: user._id,
    token,
  });
}

const AuthenticationRepository = {
  createUser,
  findTokenByUser,
  signin,
  findUser,
  createToken,
};

export default AuthenticationRepository;
