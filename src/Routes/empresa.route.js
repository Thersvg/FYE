import { Router } from "express";
const EmpresaRouter = Router();

import EmpresaController from "../Controller/empresa.controller.js";
import global from "../Middlewares/global.middlewares.js";
import auth from "../Middlewares/autenticacao.empresa.middlewares.js";

EmpresaRouter.post("/", EmpresaController.CreateEmpresaController);
EmpresaRouter.get("/AllEmpresas", EmpresaController.FindAllEmpresaController);
EmpresaRouter.get(
  "/:id?",
  /* global.validEmpresa, */
  auth.autenticacaoMiddlware,
  EmpresaController.FindIdEmpresaController
);
EmpresaRouter.patch(
  "/:id?",
  /*   global.validId, */
  auth.autenticacaoMiddlware,
  /*   global.validEmpresa, */
  EmpresaController.UpdateEmpresaController
);

EmpresaRouter.delete("/:id", EmpresaController.DeleteEmpresa);

export default EmpresaRouter;
