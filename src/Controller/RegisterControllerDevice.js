import DeviceTokensService from "../Services/DeviceTokens.service.js"

const NotificationDeviceToken = async (req, res) =>{
    try{
        const { token } = req.body;

        if (!token) {
            res.status(400).send('Token não fornecido.');
        }

        await DeviceTokensService.CreateStorageTokenService(token);

        res.status(200).send('Token registrado com sucesso.');
    }catch (error){
        res.status(400).send("Não foi possivel salvar o token no banco de dados");
    }

}

export default {NotificationDeviceToken};