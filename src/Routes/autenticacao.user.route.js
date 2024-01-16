import { Router } from "express";
const router = Router();

import autenticacaoUserControllerLogin from "../Controller/autenticacao.user.controller.js";

router.post("/", autenticacaoUserControllerLogin);

export default router;
