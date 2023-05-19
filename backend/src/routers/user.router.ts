import { Router } from "express";
import { sample_users } from "../data";
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { UserModel } from "../models/user.model";

const router = Router();

// puts the info from data.ts into the DB
router.get("/seed", asyncHandler(
    
    async (req, res) => {
        const usersCount = await UserModel.countDocuments()
        if (usersCount > 0) {
            res.send('Seed is already done!');
            return
        }
   
        // if the jobs dosent exist into the DB
        await UserModel.create(sample_users)
        res.send('Seed Is Done!')
}
));
router.post('/login', asyncHandler(
    async (req, res) => {

    const { email, password } = req.body;
    const user = await UserModel.findOne({email,password})

    if (user) {
        res.send(generateTokenResponse(user))
    } else {
        res.status(400).send('Username or password is not valid!')
    }
    }
))

// function to generate token

const generateTokenResponse = (user: any)=>{
    const token = jwt.sign({
        email:user.email, isAdmin:user.isAdmin
    }, 'SomeRandomText', {
        expiresIn:'30d'
    })

    user.token = token;
    return user
}

export default router;