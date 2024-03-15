import DeviceTokensService from "../Services/DeviceTokens.service.js"

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
    try{

        const token = req.query.token;

        if (!token) {
            res.status(400).send('Token não fornecido.');
        }

        const response = await DeviceTokensService.FindTokenServiceStorage(token);

        if(response){
            res.status(200).send('Token encontrado com sucesso.');
        }

        res.send('');

    }catch(error){
        res.status(500).send("Não foi possivel encontrar token");
    }
}

export default {
    NotificationDeviceToken,
    FindTokenStorageController,
};