import DeviceTokensService from "../Services/DeviceTokens.service.js"
import { Expo } from 'expo-server-sdk';

const NotificationDeviceToken = async (req, res) =>{
    try{
        const { token } = req.body;

        if (!token) {
            res.status(400).send('Token não fornecido.');
        }

        const body = {
            token: token
        }
        const response = await DeviceTokensService.CreateStorageTokenService(body);

        res.status(200).send('Token registrado com sucesso.');
    }catch (error){
        res.status(500).send("Não foi possivel salvar o token no banco de dados");
    }

}

const FindTokenStorageController = async (req, res) =>{
    const token = req.params.token;
    try{
        const response = await DeviceTokensService.FindTokenServiceStorage(token);

        if(response.length === 0){
            res.status(200).send('');
            return;
        }

        return res.status(200).send(response);
        
    }catch(error){
        res.status(500).send("Não foi possivel encontrar token");
    }
}

const SendMessageToDevices = async (req, res) =>{

    const expo = new Expo();

    const sendPushNotification = async (token, title, body) => {
        // Verifique se o token é válido
        if (!Expo.isExpoPushToken(token)) {
        console.error('Token de notificação push inválido:', token);
        return;
        }
    
        // Montar a mensagem
        const message = {
        to: token,
        sound: 'default',
        title: title,
        body: body,
        data: { anyData: 'aqui' }, // Dados adicionais que você deseja enviar com a notificação
        };
    
        // Enviar a notificação
        try {
        await expo.sendPushNotificationsAsync([message]);
        console.log('Notificação enviada com sucesso:', message);
        } catch (error) {
        console.error('Erro ao enviar notificação:', error);
        }
    };
   
    try{
        const token = 'ExponentPushToken[HSF7-XJ-5UuuwhbyLPeSZ1]';
        const title = 'EII';
        const body = 'Uma nova entrega está disponível!';

        sendPushNotification(token, title, body);
        return res.status(200).send('Notificação enviada com sucesso');

    }catch (error){
        return res.status(500).send('Notificação não enviada');
    }

}

export default {
    NotificationDeviceToken,
    FindTokenStorageController,
    SendMessageToDevices,
};