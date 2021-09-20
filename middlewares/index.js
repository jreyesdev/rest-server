const { validarCampos } = require("./fieldsValidate")

class Middleware{
    constructor(){
        this.resp = []
    }
    // Respuesta de middlewares
    retornoMid(){
        return this.resp.push(validarCampos)
    }
}

module.exports = Middleware