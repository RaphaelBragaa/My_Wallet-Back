import db from "../../database/mongo.js";


async function registerCash(cash) {
  return db.collection("moneys").insertOne({ ...cash });
}

async function findCash(id) {
  return db.collection("moneys").find({ user: id }).toArray();
}

const CashFlowRepository = {
  registerCash,
  findCash,
};

export default CashFlowRepository;
