import axios from 'axios';
import  CreateStorageIDService from '../Services/PlanID.service.js';

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

    console.log(planId);
    return planId;
  }

  const responseID = await FindID();

  const {
    email,
    cardToken,
  } = req.body;

  const preapprovalData = {
  preapproval_plan_id: responseID,
  payer_email: email,
  card_token_id: cardToken,
  back_url: "https://www.google.com",
  status: "active"
  };
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.MP_ACCESS_TOKEN}`
    }
  };
  
  axios.post('https://api.mercadopago.com/preapproval', preapprovalData, config)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    }); 
};

export default {CreatePlan, 
  SubscribeToPlan
};