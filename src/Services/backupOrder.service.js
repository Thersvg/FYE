import BackupOrderModel from '../Model/backupOrders.model.js'

const CreateBackupOrder = (body) =>
    BackupOrderModel.create(body);

export default {
    CreateBackupOrder,
}