/////////////////////////////////////////////////////////
//Importaciones
////////////////////////////////////////////////////////
const {Schema, model} = require('mongoose');
////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
//Esquema del usuario
////////////////////////////////////////////////////////
const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'El password es obligatorio']
    },
    img:{
        type: String,
    },
    rol:{
        type: String,
        required:true,
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});
////////////////////////////////////////////////////////

UsuarioSchema.methods.toJSON = function(){
    const {__v, password, ...usuario } = this.toObject();
    return usuario;
}
//Exportacion del modelo
module.exports = model('Usuario',UsuarioSchema);