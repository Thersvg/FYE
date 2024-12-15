import axios from 'axios';
import  CreateStorageIDService from '../Services/PlanID.service.js';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const CreatePlan = async (req, res) => {
    const data = {
      reason: "For You Entregas",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        billing_day: 5,
        billing_day_proportional: false,
        transaction_amount: 249.90,
        currency_id: "BRL"
      },
      payment_methods_allowed: {
        payment_types: [
          {
            id: "credit_card"
          }
        ],
      },
      back_url: "https://www.yoursite.com",
    };

    const options = {
      method: 'post',
      url: 'https://api.mercadopago.com/preapproval_plan',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`
      },
      data: data
    };

     axios(options)
      .then(response => {
        console.log("Plan created successfully:", response.data); 
        res.status(201).send(response.data.id); 

        const body = {
          PlanID: response.data.id,
        };

        async function SaveID(body) {
          try {
            await CreateStorageIDService.CreateStorageIDService(body);
          } catch (error) {
            console.error("Error on save:", error.response.data);
          }
        }

        SaveID(body).then(() =>{
          console.log("ID Plan save on sucess");
        }).catch((error) =>{
          console.log("Error on save ID Plan in DB");
        })

      })
      .catch(error => {
        console.error("Error creating plan:", error.response.data);
        res.status(500).send(error.response.data); 
      }); 


};

const SubscribeToPlan = async (req, res) => {

  async function FindID() {

    const response = await CreateStorageIDService.FindIDService();
    const firstObject = response[0];
    const planId = firstObject.PlanID;
    return planId;
  }
  const responseID = await FindID();
  console.log('ID do plano: ',responseID);

  // Criar ou associar um cartão ao cliente
  async function associateCardToCustomer(token, email) {
    const customerResponse = await fetch('https://api.mercadopago.com/v1/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({
        email: email, 
      }),
    });


  if (!customerResponse.ok) {
    const error = await customerResponse.json();
    throw new Error(`Erro ao criar cliente: ${JSON.stringify(error)}`);
  }

  const customerData = await customerResponse.json();
  const customerId = customerData.id;  // ID do cliente

  console.log('Resultado da crição do Cartão: ',customerData,customerId);

  // Associar o cartão ao cliente
  const cardResponse = await fetch(`https://api.mercadopago.com/v1/customers/${customerId}/cards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      token: token,  
    }),
  });

    if (!cardResponse.ok) {
      const error = await cardResponse.json();
      throw new Error(`Erro ao adicionar cartão: ${JSON.stringify(error)}`);
    }

    const cardData = await cardResponse.json();

    console.log('Resultado da associação do Cartão: ',cardData,customerId);

    return { customerId, cardData };
  }

  // Criar a assinatura
  async function createPreapproval(customerId, cardTokenId, payerEmail) {
    const preapprovalData = {
      preapproval_plan_id: responseID,
      reason: "For You Entregas",
      external_reference: "FYE-1234",
      payer_email: payerEmail,   
      card_token_id: cardTokenId,
      back_url: "https://www.mercadopago.com.ar", 
      status: "authorized",    
    };

    const response = await fetch('https://api.mercadopago.com/preapproval', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(preapprovalData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Erro ao criar assinatura: ${JSON.stringify(error)}`);
    }

    const data = await response.json();
    return data;
  }

  const object = req.body;
  console.log('Objeto recebido: ',object);

    try {
      // 1: Associar o cartão ao cliente
      console.log('emial do cliente antes da função: ',object.payer.email);
      const { customerId, cardData } = await associateCardToCustomer(object.token, object.payer.email);

      // 2: Criar a assinatura
      const preapprovalData = await createPreapproval(customerId, cardData.id, object.payer.email);
      
      res.status(201).send(preapprovalData);
    } catch (error) {
      console.error(error);
      res.status(500).send(error.message || error);
    }


/*  const preapprovalData = {
    preapproval_plan_id: responseID,
    reason: "For You Entregas",
    external_reference: "FYE-1234",
    payer_email: object.payer.email,   
    card_token_id: object.token,
    back_url: "https://www.mercadopago.com.ar", 
    status: "authorized",           
  };

   console.log(preapprovalData);

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`
    },
    body: JSON.stringify(preapprovalData)
  };
  
  fetch('https://api.mercadopago.com/preapproval', config)
    .then(async response => {

      if (response.ok) {
        const data = await response.json();
        res.status(201).send(data); 
        console.log(data);

      } else {
        const error = await response.json();
        res.status(response.status).send(error);
        console.log(error);
      }
    })
    .catch(error => {
      res.status(500).send(error.message || error);
    }); */
};

const Card = async(req,res) =>{

  const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN});
  const payment = new Payment(client);

  const object = req.body;

  const teste = {
    transaction_amount: Number(object.transaction_amount),
    token: object.token,
    description: object.description,
    installments: object.installments,
    payment_method_id: object.payment_method_id,
    issuer_id: Number(object.issuer_id),
        payer: {
        email: object.payer.email,
        identification: {
    type: object.payer.identification.type,
    number: Number(object.payer.identification.number),
  }}
  }

  console.log("Request body:", teste);
  
  payment.create({
      body: { 
        transaction_amount: Number(object.transaction_amount),
        token: object.token,
        description: object.description,
        installments: object.installments,
        payment_method_id: object.payment_method_id,
        issuer_id: Number(object.issuer_id),
            payer: {
            email: object.payer.email,
            identification: {
        type: object.payer.identification.type,
        number: Number(object.payer.identification.number),
      }}},
      requestOptions: { idempotencyKey: `${Date.now()}-${Math.random()}` }
  })
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
  
}
export default {CreatePlan, 
  SubscribeToPlan,Card
};