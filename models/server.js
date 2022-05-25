/////////////////////////////////////////////////////////
//Importaciones
////////////////////////////////////////////////////////
const express = require('express');
const cors = require('cors');

const { bdConnection } = require('../database/config');
////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
//clase del servidor
////////////////////////////////////////////////////////
class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //llamar conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    //conectar a base de datos
    async conectarDB(){
        await bdConnection();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        this.app.use( this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}
////////////////////////////////////////////////////////


//Exportacion
module.exports = Server;
