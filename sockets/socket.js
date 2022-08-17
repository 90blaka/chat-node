const { io } = require('../index');
const {comprobarJWT} = require("../helpers/jwt");
const { usuarioConectado, usuarioDesconectado, grabarMensaje} = require('../controllers/socket');

//Message socket
io.on("connection", (client) => {
    console.log("Cliente conectado");
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-mitoken-personalizado-header']);
   
    //Verificar autenticacion
    if(!valido) {
        return client.disconnect() 
    }

    usuarioConectado(uid);
    
    // Ingresar al usuario a una sala especifica
    // sala global client.id, 621fe24dde06f7957a5cc641
    
    client.join(uid);
    
    //Escuchar del cliente mensaje-personal
    client.on('mensaje-personal', async (payload) =>{
        console.log(payload);
        await grabarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal', payload);
    })
    
    client.on("disconnect", () => {
        usuarioDesconectado(uid);
    });

    client.on('mensaje', ( payload )=>{
        console.log('Mensaje', payload);

        io.emit('mensajeBack',{admin:'Nuevo mensaje'})
    });

});