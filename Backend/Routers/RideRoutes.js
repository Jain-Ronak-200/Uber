import express from 'express';
import {body,query} from 'express-validator';
import  {confirmRide, createRide, endRide, getfare ,startRide} from '../controllers/RideController.js';
import { authUser,captainAuth } from '../middelware/auth.js';


const riderouter = express.Router();



riderouter.post('/create',authUser,
    body('pickup').isString().isLength({min:3}).withMessage('Invalid Pickup Location'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid Drop Location'),
    body('vehicleType').isString().isIn(['auto','car','motorcycle']).withMessage('Invalid Vehicle Type'),
    createRide
)
riderouter.get('/getfare',authUser,
    query('pickup').isString().isLength({min:3}).withMessage('invalid pickup'),
    query('destination').isString().isLength({min:3}).withMessage('invalid destination'),
    getfare
)
riderouter.post('/confirm',captainAuth,
   confirmRide
)
riderouter.get('/start-ride',captainAuth,
    query('otp').isString().isLength({min:3,max:10}).withMessage('invalide otp'),startRide
)
riderouter.post('/end-ride',captainAuth,endRide)

export default riderouter;