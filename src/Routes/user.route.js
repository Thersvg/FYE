import express from "express";
import global from "../Middlewares/global.middlewares.js";
import User from "../Controller/user.controller.js";

const UserRoute = express.Router();

UserRoute.post("/", User.create_User_Controller);
UserRoute.get("/", User.FindAllUsers_Controller);
UserRoute.get(
  "/:id",
  global.validId,
  global.validUser,
  User.FindUserId_Controller
);
UserRoute.patch(
  "/:id",
  global.validId,
  global.validUser,
  User.UpdateUser_Controller
);

export default UserRoute;
