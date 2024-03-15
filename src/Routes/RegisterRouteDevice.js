import { Router } from "express";
const Device = Router();

import DeviceTokenController from '../Controller/RegisterControllerDevice.js'

Device.post('/', DeviceTokenController.NotificationDeviceToken);

Device.post('/find', DeviceTokenController.FindTokenStorageController);

export default Device;