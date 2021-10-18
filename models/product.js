const { Schema, model } = require('mongoose')

const ProductSchema = Schema({
    name: {
        type: String,
        required: [true,'Name is required'],
    },
    stock:{
        type: Number,
        default: 0
    },
    price:{
        type: Number,
        default: 0
    },
    description:{
        type: String,
        default: null
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: [true,'Category is required']
    },
    image:{
        type: String,
        default: null
    },
    created:{
        type: Date,
        default: Date.now
    },
    created_by:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true,'Created_by is required']
    },
    updated:{
        type: Date,
        default: null
    },
    updated_by:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        default: null
    },
    deleted:{
        type: Date,
        default: null
    }
})

ProductSchema.methods.toJSON = function(){
    const { __v, _id, deleted, ...data } = this.toObject()
    data.uid = _id
    return data
}

module.exports = model('Producto',ProductSchema)