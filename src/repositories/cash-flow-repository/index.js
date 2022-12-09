
import mongo from "../../database/mongo.js"

let db = await mongo()

async function registerCash(cash){
    return db.collection('moneys').insertOne({...cash})
}

async function findCash(id){
    return db.collection('moneys').find({user:id}).toArray()
}

const CashFlowRepository = {
    registerCash,
    findCash
}

export default CashFlowRepository;