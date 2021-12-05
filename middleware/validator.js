const { check, validationResult } = require('express-validator');


exports.signupValidator = [
    check('username')
    .not().isEmpty()
    .trim()
    .withMessage('All fields Required'),
   check('email')
     .isEmail()
     .isEmail()
     .normalizeEmail()
     .withMessage('Invalid email'),
    check('password')
    .isLength({ min: 6 })
    .withMessage('password must be at least six characters long'), 
];

exports.signinValidator = [
   check('email')
     .isEmail()
     .isEmail()
     .normalizeEmail()
     .withMessage('Invalid email'),
    check('password')
    .isLength({ min: 6 })
    .withMessage('password must be at least six characters long'), 
];



exports.validatorResult = (req, res, next) => {
    const result = validationResult(req);
    const hasErrors = !result.isEmpty();

    if(hasErrors) {
        const firstError = result.array()[0].msg;
        return res.status(400).json({
            errorMessage: firstError,
        });
        
        console.log('hasErrors:', hasErrors);
        console.log('result: ',result);

    }

    next();
}