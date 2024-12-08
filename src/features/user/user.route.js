import express from 'express';
import UserController from './user.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';

const userController=new UserController();
const userRouter = express.Router();


userRouter.post('/signup',userController.signUp);
userRouter.post('/signin',userController.signIn);
userRouter.put('/resetPassword',jwtAuth,userController.resetPassword);

export default userRouter;