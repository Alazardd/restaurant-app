const User = require('../models/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpire} = require('../config/keys');

exports.signupController = async (req, res) => {
   const {username, email, password } = req.body    // destructuring /retrieve all infn we can use later 
   
   try {
       const user = await User.findOne({ email });
       if (user) {
           return res.status(400).json({
               errorMessage: 'Email already exist'
           });
        }

        const newUser = new User();  //to create new user instance
       newUser.username = username;
       newUser.email = email
                                       //salt random data used as additional input that hashes data, password
       const salt = await bcrypt.genSalt(10);
       newUser.password = await bcrypt.hash(password, salt);

       
       await newUser.save();

       res.json({
           successMessage: 'Registration success.',
       });


   } catch (err) {
       console.log('signupController error: ', err);
       res.status(500).json({
           errorMessage: 'Server error',
       });

   }
};
         // it listens the request 

exports.signinController = async (req, res) => {
     const { email, password } = req.body;

     try {
         const user = await User.findOne({ email });
         if (!User) {
             return res.status(400).json({
                 errorMessage: 'Invalid credentials',
             });

         }

         //password match with the database 

         const isMatch = await bcrypt.compare(password, user.password);
         if (!isMatch) {
             return res.status(400).json({
                 errorMessage: 'Invalid credentials',
             });

         }

         const payload = {
             user: {
                 _id: user._id,
             },
         };

         jwt.sign(payload, jwtSecret, { expiresIn: jwtExpire }, (err, token) => {
             if (err) console.log('jwt error: ', err);
             const { _id, username, email, role } = user;

             res.json({
                 token,
                 user: { _id, username, email, role },
             });
         });



     } catch (err) {
         console.log('signinController error: ', err);
         res.status(500).json({
             errorMessage: 'server error',

         });

     }
};
             