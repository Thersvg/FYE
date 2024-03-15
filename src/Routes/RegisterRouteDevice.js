import { Router } from "express";
const Device = Router();

import DeviceTokenController from '../Controller/RegisterControllerDevice.js'

Device.post('/', DeviceTokenController.NotificationDeviceToken);

Device.get('/find/:token', DeviceTokenController.FindTokenStorageController);

export default Device;