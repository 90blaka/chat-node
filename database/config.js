const mongoose = require('mongoose');

const dbConnetion = async() =>{
    try{
        await mongoose.connect(process.env.DB_CNN,{
            useNewUrlParser: true,
            useunifiedTopology: true
        });
        console.log('BD connet...Ok')
    }catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos - Hable con el admin');
    }
}

module.exports = {
    dbConnetion
}