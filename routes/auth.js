/**
 * path: api/login
 */

const { Router, response } = require('express');
const {check} = require("express-validator");

const {crearUsuario, login, renewToken } = require("../controllers/auth");
const {validarCompos} = require("../middlewares/validar-compos");
const {validarJWT} = require("../middlewares/validar-jwt");

const router =  Router();

router.post('/new', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'No es un email valido').isEmail(),
    validarCompos
] , crearUsuario);

router.post('/', [
    check('password','El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'No es un email valido').isEmail(),
    validarCompos
] , login);

router.get('/renew',validarJWT ,renewToken);

module.exports = router;