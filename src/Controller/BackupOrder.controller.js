import backupOrderService from "../Services/backupOrder.service.js";
import PedidoHistorico from "../Services/historico.pedidos.service.js"

const OrderToBackup = async (req, res) => {
    try {
      const pedidoID = req.id;
      const PedidoDB = req.empresa;
  
      if (!PedidoDB) {
        res.send("Não há entregas");
      }
  
      const {
        codigo_pedido,
        name_cliente,
        valor_pedido,
        endereco_cliente,
        telefone_cliente,
        descricao_pedido,
        forma_pagamento,
        taxa_entrega,
      } = PedidoDB.detalhes_pedido;
  
      const InfoEntregador = PedidoDB.name_entregador;
      const InfoEmpresa = PedidoDB.name_empresa;
  
      await backupOrderService.CreateBackupOrder({

        detalhes_pedido: {
          codigo_pedido,
          name_cliente,
          valor_pedido,
          endereco_cliente,
          telefone_cliente,
          descricao_pedido,
          forma_pagamento,
          taxa_entrega,
        },
        name_entregador: InfoEntregador,
        name_empresa: InfoEmpresa,
      });
  
      await PedidoHistorico.DeletePedidoHistorico(pedidoID);
      res.status(200).send(PedidoDB);

    } catch (err) {
      res.status(500).send("Falhou, por favor tente novamente.");
    }
  };

export default {
    OrderToBackup,
}