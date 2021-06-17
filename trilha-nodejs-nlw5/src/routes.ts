import { Router } from "express";
import { SettingController } from "./controllers/SettingController";
import { UserController } from "./controllers/UserController";
import { MessageController } from "./controllers/MessageController";

const routes = Router();

const settingController = new SettingController();
routes.post("/settings", settingController.create);

const userController = new UserController();
routes.post("/users", userController.create);

const messageController = new MessageController();
routes.post("/messages", messageController.create);
routes.get("/messages/:id", messageController.showByUser);


export {routes}