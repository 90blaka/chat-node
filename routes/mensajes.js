/*
    Path: /api/mensajes
 */


const {validarJWT} = require("../middlewares/validar-jwt");
const {Router} = require("express");
const {obtenerChat} = require("../controllers/mensajes");

const router =  Router();



router.get('/:de',validarJWT ,obtenerChat);

module.exports = router;