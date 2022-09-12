import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config()

const mongoClient = new MongoClient('mongodb://localhost:27017')

export default async function mongo () {
    let conn;

    try {
        
        conn = await mongoClient.db('batepapouol')
    return conn;
    } catch (error) {
        console.error(error)
        return error;    
    }
}