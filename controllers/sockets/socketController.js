const { comprobarJWT } = require('../../middlewares/jwtValidate')
const chatMensajes = require('../../models/chat')

const socketController = async(socket, io) => {
    const user = await comprobarJWT(socket.handshake.headers['x-token'])
    if(!user) socket.disconnect()

    socket.join(user.id)

    chatMensajes.conectarUsuario(user)
    io.emit('usuarios-activos',chatMensajes.usuariosArr)
    socket.emit('recibir-mensaje',chatMensajes.ultimosMsg)
    
    socket.on('disconnect',()=>{
        chatMensajes.desconectarUsuario(user.id)
        io.emit('usuarios-activos',chatMensajes.usuariosArr)
    })
    socket.on('enviar-mensaje',({ uid, msj })=>{
        if(uid){
            const mensaje = {
                de: {
                    uid: user.id,
                    name: user.name
                },
                msj
            }
            socket.to(uid).emit('mensaje-privado',mensaje)
        }else{
            chatMensajes.enviarMensaje(user.id, user.name, msj)
            io.emit('recibir-mensaje',chatMensajes.ultimosMsg)
        }
    })
}

module.exports = { socketController }