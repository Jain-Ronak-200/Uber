import express from 'express';
import {body} from 'express-validator'
import { registerCaptain,loginCaptain, getCaptainProfile, logoutCaptain, } from '../controllers/captaincontroller.js';
import { captainAuth } from '../middelware/auth.js';

const captainRouter = express.Router();

captainRouter.post('/register',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('fullname.firstname').isLength({min:3}).withMessage('First name must be 3 characters'),
    body('password').isLength({min:6}).withMessage('Password must be 6 characters'),
    body('vehicle.color').isLength({min:3}).withMessage('Color must be 3 characters'),
    body('vehicle.plate').isLength({min:3}).withMessage('Plate must be 3 characters'),
    body('vehicle.capacity').isInt({min:1}).withMessage('Capacity must be 1'),
    body('vehicle.type').isLength({min:3}).withMessage('Type must be 3 characters')
],registerCaptain)
captainRouter.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min:6}).withMessage('Password must be 6 characters'),


],loginCaptain)
captainRouter.get('/profile',captainAuth,getCaptainProfile)
captainRouter.get('/logout',captainAuth,logoutCaptain)

export default captainRouter