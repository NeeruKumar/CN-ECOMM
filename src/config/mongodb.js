import { MongoClient } from "mongodb";

//const url="mongodb://localhost:27017/ecomdb";
//mongodb://localhost:27017/

let clientdb;
export const ConnectToMongoDB=()=>{
    MongoClient.connect(process.env.DB_URL)
    .then(client=>{
        clientdb=client;
        console.log("MongoDB is connected");
        createCounter(clientdb.db());
        createIndex(clientdb.db());

    }).catch(err=>{
        console.log(err);
    })
}


export const getDB=()=>{
    return clientdb.db();
}

const createCounter= async(db)=>{
    const existingCounter= await db.collection("counters").findOne({_id:'cartItems'});
    if(!existingCounter){
        await db.collection('counters').insertOne({_id:'cartItems',value:0});
    }
    const existingCounter1= await db.collection("counters").findOne({_id:'products'});
    if(!existingCounter1){
        await db.collection('counters').insertOne({_id:'products',value:0});
    }
}

const createIndex = async(db)=>{
    try{
        await db.collection('products').createIndex({price:1});
        await db.collection('products').createIndex({name:1, category:-1});
        await db.collection('products').createIndex({desc:"text"});
    }catch(err){
        console.log(err);
    }
}