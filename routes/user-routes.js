import express from "express";
import {getAllUser,getOneUser,patchUser, postCreateUser, putUser, deleteUser, getUserRenderList, postUserLogin} from "../controllers/user-controller.js";
import { authorization } from "../authorization/userAuth.js";
const userRouter = express.Router();

// userRouter.get("/users/one", getUserRenderList);//ejs based html page render method

userRouter.get("/users", authorization, getAllUser);

userRouter.post("/users", postCreateUser);

userRouter.post("/users/login", postUserLogin);

userRouter.get("/users/:id", getOneUser);

userRouter.put("/users/:id", putUser);

// userRouter.patch("/users/:id", patchUser);

userRouter.delete("/users/:id", deleteUser);

export default userRouter;
