const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: [true,'Name is required']
    },
    email:{
        type: String,
        required: [true,'Email is required'],
        unique: true
    },
    password:{
        type: String,
        required: [true,'Password is required']
    },
    image:{
        type: String
    },
    role:{
        type: String,
        required: [true,'Rol is required'],
        enum: ['SUPER_ADMIN','ADMIN','USER']
    },
    delete:{
        type: Boolean,
        default: false
    },
    google:{
        type: Boolean,
        default: false
    }
})

UsuarioSchema.methods.toJSON = function(){
    const { __v, password, _id, ...usuario } = this.toObject()
    usuario.uid = _id
    return usuario
}

module.exports = model('Usuario',UsuarioSchema)