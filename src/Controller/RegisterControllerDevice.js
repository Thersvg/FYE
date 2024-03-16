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
        const response = await DeviceTokensService.FindTokenServiceStorage();

        if(response.length === 0){
            res.status(200).send('Nenhum token armazenado');
            return;
        }

        return res.status(200).send(response);
        
    }catch(error){
        res.status(500).send("Não foi possivel encontrar token");
    }
}

export default {
    NotificationDeviceToken,
    FindTokenStorageController,
};