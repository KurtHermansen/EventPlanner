const express = require('express');
const router = express.Router();
// const passport = require('passport')
const dotenv = require('dotenv')
const { auth, requiresAuth } = require('express-openid-connect');
const UserSchema = require('../models/User')
const mongoose = require('mongoose')
// Load config
dotenv.config({ path: './config/config.env' })

const userController = require('../controllers/users');


// router.post('/', userController.createUser);

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
  };
  
  // auth router attaches /login, /logout, and /callback routes to the baseURL
  router.use(auth(config));
  
  // req.isAuthenticated is provided from the auth router
  router.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });

  router.post('/', (req, res) => {
    const user = {   
        given_name: req.oidc.user.given_name,
        family_name:req.oidc.user.family_name,
        nickname: req.oidc.user.nickname,
        name: req.oidc.user.name,
        picture: req.oidc.user.picture,
        locale: req.oidc.user.locale,
        updated_at: req.oidc.user.updated_at,
        email: req.oidc.user.email,
        email_verified: req.oidc.user.email_verified,
        sub: req.oidc.user.sub
    }
    try {
        const newUser = new UserSchema(req.body);
        newUser
            .save()
            .then((data) => {
                console.log(data);
                res.status(201).send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || 'Some error occurred while creating the User.'
                });
            });
    } catch (err){
        res.status(500).json(err);
    }
  })

  router.get('/profile', requiresAuth(), (req, res) => {
    const user = {   
        given_name: req.oidc.user.given_name,
        family_name:req.oidc.user.family_name,
        nickname: req.oidc.user.nickname,
        name: req.oidc.user.name,
        picture: req.oidc.user.picture,
        locale: req.oidc.user.locale,
        updated_at: req.oidc.user.updated_at,
        email: req.oidc.user.email,
        email_verified: req.oidc.user.email_verified,
        sub: req.oidc.user.sub
    }
    res.send(JSON.stringify(req.oidc.user));
    console.log(user)
  })


module.exports = router
