const express = require('express');

const authController = require('../controllers/auth.controllers');

const router = express.Router();

router.get('/signup', authController.getSignup); //we're getting this func from controllers.
router.post('/signup', authController.signUp); 
router.get('/login', authController.getLogin); 
router.post('/login', authController.login); 
router.post('/logout', authController.logout); 



module.exports = router;