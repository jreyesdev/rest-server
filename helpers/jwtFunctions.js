const jwt = require('jsonwebtoken')

class JWTHand{
    generar(uid){
        return new Promise((res,rej) => {
            const payload = { uid }
            jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn: Math.floor(Date.now() / 1000) + (60 * 60 * 4)
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
}

module.exports = new JWTHand()