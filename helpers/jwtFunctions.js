const jwt = require('jsonwebtoken')

class JWTHand{
    generar(uid){
        return new Promise((res,rej) => {
            const payload = { uid }
            jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn: '4h'
            },(err,token) =>{
                if(err){
                    console.log(err)
                    rej('Error al generar token')
                    return false
                }
                res(token)
            })
        })
    }
    validar(token){
        return jwt.verify(token, process.env.JWT_SECRET)
    }
}

module.exports = new JWTHand()