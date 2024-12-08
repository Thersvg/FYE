import mongoose from "mongoose";
import UserService from "../Services/user.service.js";
import EmpresaService from "../Services/empresa.service.js";
import PedidosGerais from "../Services/pedidos.aceitos.service.js";
import PedidosHistorico from "../Services/historico.pedidos.service.js"

const validId = (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log(id);
      return res.status(400).send("ID inválido" );
    }
    req.id = id;
    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const validUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await UserService.findByIdService(id);

    if (!user) {
      return res.status(400).send("Usuário não encontrado");
    }
    (req.id = id), (req.user = user);
    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const validEmpresa = async (req, res, next) => {
  try {
    let id = req.params.id;
    const idLogged = req.empresaId;

    if (!id) {
      id = idLogged;
    }

    const Empresa = await EmpresaService.findIdEmpresaService(id);

    if (!Empresa) {
      return res.status(400).send("Empresa não encontrada");
    }

    (req.id = id), (req.empresa = Empresa);

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const BuscaEmpresaEPedido = async (req, res, next) => {
  try {
    const id = req.empresaId;

    const EmpresaEpedido = await PedidosGerais.FindPedidosAceitosById(id);

    if (!EmpresaEpedido) {
      return res
        .status(400)
        .send("Pedido e Empresa não encontrada");
    }

    req.id = id;
    req.empresa = EmpresaEpedido;

    next();
  } catch (err) {
    res
      .status(500)
      .send({ message: "Não foi possivel realizar essa operação" });
  }
};

const BuscaEmpresaEPedidoParaHistorico = async (req, res, next) => {
  try {
    const id = req.id;

    const EmpresaEpedido = await PedidosGerais.FindPedidosAceitosByIdPedido(id);

    if (!EmpresaEpedido) {
      return res
        .status(400)
        .send("Pedido e Empresa não encontrada");
    }

    req.id = id;
    req.empresa = EmpresaEpedido;

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};


const FindOrderHistoricToBackup = async (req, res, next) =>{
  try {
    const id = req.id;

    const EmpresaEpedido = await PedidosHistorico.FindOrderHistoric(id);

    if (!EmpresaEpedido) {
      return res
        .status(400)
        .send("Pedido e Empresa não encontrada");
    }

    req.id = id;
    req.empresa = EmpresaEpedido;

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}

const BuscaEdeletaPedidoAceito = async (req, res, next) => {
  try {
    const id = req.id;
    const DeletePedido = await PedidosGerais.DeletePedidoAceitoById(id);
    req.id = id;
    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default {
  validId,
  validUser,
  validEmpresa,
  BuscaEmpresaEPedido,
  BuscaEdeletaPedidoAceito,
  BuscaEmpresaEPedidoParaHistorico,
  FindOrderHistoricToBackup,
};
