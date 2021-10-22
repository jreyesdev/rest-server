const compression = require('compression')
const express = require('express')
const { createServer } = require('http')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const { connection } = require('../database/config')
const { socketController } = require('../controllers/sockets/socketController')

class Server{
    constructor(){
        this.port = process.env.APP_PORT
        this.app = express()
        this.server = createServer(this.app)
        this.io = require('socket.io')(this.server)
        this.dbconnect()
        this.middlewares()
        this.routes()
        this.socketsEvents()
    }

    async dbconnect(){
        await connection()
    }

    middlewares(){
        this.app.use(compression())
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/'
        }))
    }

    routes(){
        this.app.use('/api/auth',require('../routes/auth'))
        this.app.use('/api/category',require('../routes/categories'))
        this.app.use('/api/products',require('../routes/products'))
        this.app.use('/api/search',require('../routes/search'))
        this.app.use('/api/uploads',require('../routes/uploads'))
        this.app.use('/api/users',require('../routes/users'))
    }

    socketsEvents(){
        this.io.on('connection', so => socketController(so, this.io))
    }

    listen(){
        this.server.listen(this.port,() => console.log(`Server on port ${this.port}`))
    }
}

module.exports = new Server()