import { Router } from "express";
const EmpresaRouter = Router();

import EmpresaController from "../Controller/empresa.controller.js";
import global from "../Middlewares/global.middlewares.js";

EmpresaRouter.post("/", EmpresaController.CreateEmpresaController);
EmpresaRouter.get("/", EmpresaController.FindAllEmpresaController);
EmpresaRouter.get(
  "/:id",
  global.validId,
  global.validEmpresa,
  EmpresaController.FindIdEmpresaController
);
EmpresaRouter.patch(
  "/:id",
  global.validId,
  global.validEmpresa,
  EmpresaController.UpdateEmpresaController
);

EmpresaRouter.delete("/:id", EmpresaController.DeleteEmpresa);

export default EmpresaRouter;
