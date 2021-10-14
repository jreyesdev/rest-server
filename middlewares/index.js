const { validarCampos } = require("./fieldsValidate")

class Middleware{
    // Respuesta de middlewares
    retornoMid(mids){
        mids.push(validarCampos)
        return mids
    }
}

module.exports = new Middleware()