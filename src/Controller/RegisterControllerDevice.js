
let tokens = [];

const NotificationDeviceToken = async (req, res) =>{
    const { token } = req.body;

    if (!token) {
      return res.status(400).json('Token não fornecido.');
    }

    // Salve o token no banco de dados ou em outro local de armazenamento
    tokens.push(token);

    return res.status(200).json('Token registrado com sucesso.');
}

export default {NotificationDeviceToken};