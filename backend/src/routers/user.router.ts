import { Router } from "express";
import { sample_users } from "../data";
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User, UserModel } from "../models/user.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import bcrypt from 'bcryptjs';

const router = Router();

// puts the info from data.ts into the DB
router.get("/seed", asyncHandler(
    
    async (req, res) => {
        const usersCount = await UserModel.countDocuments()
        if (usersCount > 0) {
            res.send('Seed is already done!');
            return
        }
   
        // if the user dosent exist into the DB
        await UserModel.create(sample_users)
        res.send('Seed Is Done!')
}
));
router.post('/login', asyncHandler(
    async (req, res) => {

        const { email, password } = req.body;
       console.log(req.body)
    const user = await UserModel.findOne({email})
    
    if(user && (await bcrypt.compare(password,user.password))) {
        res.send(generateTokenResponse(user));
    } else {
        res.status(HTTP_BAD_REQUEST).send('Username or password is not valid!')
    }
    }
))

router.post('/register', asyncHandler(
    async (req, res) => {
        const { name, email, password, address } = req.body;
        const user = await UserModel.findOne({ email })
        if (user) {
            res.status(HTTP_BAD_REQUEST).send('User already exist, please login!')
            return;
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        // creating a new user
        const newUser: User = {
            id: '',
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            address,
            isAdmin: false
        }
        const dbUser = await UserModel.create(newUser);
        res.send(generateTokenResponse(dbUser))
    }
    
))
// function to generate token

const generateTokenResponse = (user: any)=>{
    const token = jwt.sign({
        email:user.email, isAdmin:user.isAdmin
    }, 'SomeRandomText', {
        expiresIn:'30d'
    });
    user.token = token;
    console.log('Generated token:', token);
    return user
}

export default router;