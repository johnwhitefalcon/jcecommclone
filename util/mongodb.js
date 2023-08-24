
import { MongoClient } from 'mongodb'
//const assert = require('assert');
//const MongoClient = require('mongodb').MongoClient; 
const uri = 'mongodb+srv://johnwhitefalcon:Flow8404@cluster0.ufllo.mongodb.net/mongdbase?retryWrites=true&w=majority'
const dbname = 'mongdbase'

export async function connectToDatabase(){
  
//  const client = await new MongoClient(uri);
const client = await new MongoClient(uri)
const clientPromise  = await client.connect()

  
const db = await clientPromise.db(dbname);

return {db}

}



//  await client.connect({
//    useNewUrlParser: true,
//    useUnifiedTopology: true,
//  })
  
// const db = await client.db(dbname);






