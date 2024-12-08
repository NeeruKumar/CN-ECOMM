
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import swagger from "swagger-ui-express";
import cors from 'cors';
import productRouter from './src/features/product/product.route.js';
import userRouter from './src/features/user/user.route.js';
import basicAuth from './src/middlewares/basicAuth.middleware.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import cartRouter from './src/features/cart/cartItems.route.js';
import loggerMiddleware from './src/middlewares/logger.middleware.js';
import { connectWithMongoose } from './src/config/mongooseconfig.js';

import apidocs from "./swagger.json" assert {type:"json"};
import { ApplicationError } from './src/error-handler/applicationError.js';
import { ConnectToMongoDB } from './src/config/mongodb.js';
import orderRouter from './src/features/order/order.route.js';
import likeRouter from './src/features/likes/like.route.js';
const server=express();

// server.use((req,res,next)=>{
//   res.header("Access-Control-Allow-Origin","http://localhost:5500");
//   res.header("Access-Control-Allow-Headers","*");
//   res.header("Access-Control-Allow-Methods","*");
//   if(req.method=="OPTIONS"){
//     return res.sendStatus(200);
//   }
//   next();
// })

var corOptions={
  origin:'http://localhost:5500'
}

server.use(cors(corOptions));

server.use(bodyParser.json());
//localhost:3200/api/products/add
//localhost:3200/api/products/

server.use('/api-docs',swagger.serve,swagger.setup(apidocs));

server.use(loggerMiddleware);
server.use("/api/like",jwtAuth,likeRouter);
server.use("/api/orders",jwtAuth,orderRouter);
server.use("/api/products",jwtAuth,productRouter);

server.use("/api/cartItems",jwtAuth,cartRouter);

server.use("/api/users",userRouter);//signin  signup resetpassword

server.get('/',(req,res)=>{
    res.send("Welcome to E-commerce APIS");
})


//Error Handler Middleware
server.use((err,req,res,next)=>{
  //console.log(err);
  if(err instanceof ApplicationError){
    return res.status(err.code).send(err.message);
  }
  return res.status(500).send("Something went Wrong, Please try again!");
});




server.use((req,res)=>{
  res.status(404).send("API NOT FOUND. Please check the API docs");
})

server.listen(3200,()=>{
    console.log("Server is running on 3200 port");
    //ConnectToMongoDB();
    connectWithMongoose();
});