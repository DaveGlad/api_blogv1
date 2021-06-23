const {check} = require('express-validator')

exports.userSignupValidator = [
    check('name')
        .not()
        .isEmpty()
        .withMessage('Le nom est requis'),
    check('email')
        .isEmail()
        .withMessage('L\adresse mail n\'est pas valide'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Le mot de passe doit contenir au moins 6 caractères')
];

exports.userSigninValidator = [
    check('email')
        .isEmail()
        .withMessage('L\adresse mail n\'est pas valide'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Le mot de passe doit contenir au moins 6 caractères')
];