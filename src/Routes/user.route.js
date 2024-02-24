import express from "express";
import global from "../Middlewares/global.middlewares.js";
import User from "../Controller/user.controller.js";

import AuthUser from '../Middlewares/autenticacao.user.middlewares.js'

UserRoute.post("/enviar-email", User.SendEmailUser);

const UserRoute = express.Router();

UserRoute.post("/", User.create_User_Controller);
UserRoute.get("/All", User.FindAllUsers_Controller);
UserRoute.get(
  "/:id?",
  AuthUser.autenticacaoMiddlwareUser,
  User.FindUserId_Controller
);
UserRoute.patch(
  "/:id?",
  AuthUser.autenticacaoMiddlwareUser,
  User.UpdateUser_Controller
);

UserRoute.put(
  "/recover/:id?",
  User.RecoverUserController
);

export default UserRoute;
