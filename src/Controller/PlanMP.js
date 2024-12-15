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

// Função para verificar se o cliente já existe
async function getCustomerByEmail(email) {
  // Aqui, você pode tentar buscar o cliente usando o email (Se disponível)
  const response = await fetch(`https://api.mercadopago.com/v1/customers/search?email=${email}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`, 
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Erro ao verificar cliente: ${JSON.stringify(error)}`);
  }

  const customers = await response.json();
  console.log('cliente: ',customers);
  return customers.results.length > 0 ? customers.results[0] : null; 
}

// Função para criar ou obter um cliente
async function createOrGetCustomer(email, token) {
  
  console.log('email',email, 'e token:' ,token)

  let customer = await getCustomerByEmail(email); 

  if (!customer) {
    // Caso o cliente não exista, cria o cliente
    const customerResponse = await fetch('https://api.mercadopago.com/v1/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ email: email }),
    });

    if (!customerResponse.ok) {
      const error = await customerResponse.json();
      throw new Error(`Erro ao criar cliente: ${JSON.stringify(error)}`);
    }

    customer = await customerResponse.json(); // Cria um novo cliente
  }

  // Associar o cartão ao cliente (se necessário)
  const cardResponse = await fetch(`https://api.mercadopago.com/v1/customers/${customer.id}/cards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ token: token }),  // Token do cartão
  });

  if (!cardResponse.ok) {
    const error = await cardResponse.json();
    throw new Error(`Erro ao adicionar cartão: ${JSON.stringify(error)}`);
  }

  const cardData = await cardResponse.json(); // Cartão associado
  return { customer, cardData };
}

// Função para criar a assinatura
async function createPreapproval(customer, cardData,responseID) {

  console.log('responseID - id do plano: ', responseID);
  console.log('customerId - id do cliente:', customer.id);
  console.log('email cliente:', customer.email);
  console.log('ID do cartão:', cardData.id);

  console.log('cartão: ',cardData);
  console.log('usuario: ',customer);

  const preapprovalData = {
    preapproval_plan_id: responseID,
    reason: "For You Entregas",
    external_reference: "FYE-1234",
    payer_email: customer.email,
    card_token_id: cardData.id,
    back_url: "https://www.mercadopago.com.ar",
    status: "authorized",
  };

  // Realiza a chamada para criar a assinatura
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

  const responseID = await FindID();
  console.log('ID do plano: ',responseID);

    try {     
      // Passo 1: Criar ou obter o cliente
      const { customer, cardData } = await createOrGetCustomer(object.payer.email, object.token);

      // Passo 2: Criar a assinatura (preapproval)
      const preapprovalData = await createPreapproval(customer, cardData, responseID);
      
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