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
      back_url: "https://www.yoursite.com"
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

/*   const {
    token,
    email
  } = req.body;  */

  const preapprovalData = {
    preapproval_plan_id: '2c93808493b073170193c5ec963f0751',
    card_token_id: 'e3ed6f098462036dd2cbabe314b9de2a',
    payer_email: 'rodrigohend@outlook.com',               
    back_url: "https://www.mercadopago.com.ar", 
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

      } else {
        const error = await response.json();
        res.status(response.status).send(error);
      }
    })
    .catch(error => {
      res.status(500).send(error.message || error);
    });
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