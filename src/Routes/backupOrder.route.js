import { Router } from "express";

const BackupOrderRouter = Router();

import auth from "../Middlewares/global.middlewares.js";
import BackupOrderController from "../Controller/BackupOrder.controller.js";

BackupOrderRouter.post(
  "/:id?",
  auth.validId,
  auth.FindOrderHistoricToBackup,
  BackupOrderController.OrderToBackup
);

export default BackupOrderRouter;