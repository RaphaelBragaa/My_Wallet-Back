import AuthenticationRepository from "../repositories/user-repository/index.js";
import CashFlowRepository from "../repositories/cash-flow-repository/index.js";
import { cashSchema } from "../schema/feed-schema.js";
import dayjs from "dayjs";

const time = dayjs();

export async function postCash(req, res) {
  const pay = req.body;
  const validation = cashSchema.validate(pay, { abortEarly: true });
  if (validation.error)
    return res.status(422).send(validation.error.details[0].message);
  const { description, value, isEntry } = pay;
  const { session } = res.locals;
  const _id = session.userId;
  try {
    await AuthenticationRepository.signin(_id);
    const cash = {
      user: session.userId,
      date: time.format("DD/MM"),
      description,
      value,
      isEntry,
    };
    await CashFlowRepository.registerCash(cash);
    res.sendStatus(201);
  } catch (error) {
    console.log("🚀 ~ file: cash-controller.js:29 ~ postCash ~ error", error);
    return res.sendStatus(403);
  }
}

export async function getCash(req, res) {
  const { session } = res.locals;
  const id = session.userId;
  try {
    const cash = await CashFlowRepository.findCash(id);
    res.send(cash);
  } catch (error) {
    return res.status(401).send(error);
  }
}
