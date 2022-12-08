import mongo from "../../database/mongo.js"

let db = await mongo()

async function createUser(signup, hash){
    return db.collection('users').insertOne({...signup,password:hash}) 
}

async function findTokenByUser(token){
    return db.collection('sessions').findOne({token})
}

async function signin(_id){
    return db.collection('users').findOne({_id})
}

async function findUser(email){
    return db.collection('users').findOne({email})
}


async function createToken(userId, token){
    return db.collection("sessions").insertOne({
        userId,
        token
    })
}

const AuthenticationRepository ={
    createUser,
    findTokenByUser,
    signin,
    findUser,
    createToken
}

export default AuthenticationRepository