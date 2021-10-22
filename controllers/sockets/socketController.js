const { comprobarJWT } = require('../../middlewares/jwtValidate')

const socketController = async(socket) => {
    const user = await comprobarJWT(socket.handshake.headers['x-token'])
    if(!user) socket.disconnect()
    console.log('Cliente conectado ' + user.name + ' ' + socket.id)
}

module.exports = { socketController }