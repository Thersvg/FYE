import { Router } from "express";
const router = Router();

import autenticacaoControllerLogin from "../Controller/autenticacao.controller.js";

router.post("/", autenticacaoControllerLogin);

export default router;
