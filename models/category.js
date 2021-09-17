const { Schema, model } = require('mongoose')

const CategorySchema = Schema({
    name: {
        type: String,
        required: [true,'Name is required'],
        unique: true
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

CategorySchema.methods.toJSON = function(){
    const { __v, _id, deleted, ...categoria } = this.toObject()
    categoria.uid = _id
    return categoria
}

module.exports = model('Categoria',CategorySchema)