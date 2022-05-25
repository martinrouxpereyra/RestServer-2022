/////////////////////////////////////////////////////////
//Importaciones
////////////////////////////////////////////////////////
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');
////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////
//Controlador Get de usuarios
////////////////////////////////////////////////////////
const usuariosGet = async(req = request, res = response) => {

    const{limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    /*

    |ejecuta 2 promesas de manera independiente, por lo que la respuesta puede demorar mas

    const usuarios = await Usuario.find(query)
    .skip(Number(desde))
    .limit(Number(limite));

    const total = await Usuario.countDocuments(query);
    */

    /*
    ejecuta las 2 promesas de manera simultanea, esperando la respuesta de las dos. Si una da error, todas dan error

    aca utilizamos desestructuracion de arreglos para asignar un nombre a la primer promesa y a la segunda
    independientemente de caul termine primero, el nombre total pertenece a la primera y usuarios a la segunda
    */
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}
////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
//Controlador Post de usuarios
////////////////////////////////////////////////////////
const usuariosPost = async(req, res = response) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario( {nombre, correo, password, rol} );

    //Encriptar la password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.json({
        usuario
    });
}
////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
//Controlador Put de usuarios
////////////////////////////////////////////////////////
const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const {_id, password, google, correo, ...resto} = req.body;

    //TO DO validar contra base de datos
    if(password){
    //Encriptar la password
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}
////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
//Controlador Patch de usuarios
////////////////////////////////////////////////////////
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}
////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
//Controlador Delete de usuarios
////////////////////////////////////////////////////////
const usuariosDelete = async(req, res = response) => {
    
    const {id} = req.params;
    
    //borrar usuario fisicamente

    //no es recomendable ya que si ese usuario modifico cosas perdimos la integridad referencial,
    //ya no sabriamos que usuario fue

    //const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false} );

    res.json(usuario);
}
////////////////////////////////////////////////////////


//Exportaciones
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}