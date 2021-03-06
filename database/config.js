/////////////////////////////////////////////////////////
//Importaciones
////////////////////////////////////////////////////////
const mongoose = require('mongoose');
////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////
//Conexion a base de datos
////////////////////////////////////////////////////////
const bdConnection = async() =>{

    try {

        await mongoose.connect(process.env.MONGODB_CNN);

        console.log('base de datos online');

    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la base de datos');
    }


}
////////////////////////////////////////////////////////

//Exportaciones
module.exports = {
    bdConnection
}

