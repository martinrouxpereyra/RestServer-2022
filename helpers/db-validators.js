const Role = require('../models/role');
const Usuario = require('../models/usuario');


const esRoleValido = async(rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if(!existeRol){
        throw new Error(`el rol ${rol} no esta registrado en la BD`)
    }
}

//verificar si el correo existe
const esEmailValido = async(correo = '') =>{

    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`el correo: ${correo}, ya esta registrado`);
    }
}

const existeUsuarioPorId = async(id) =>{

    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`no existe ningun usuario con el id: ${id}`);
    }
}

module.exports = {
    esRoleValido,
    esEmailValido,
    existeUsuarioPorId
}