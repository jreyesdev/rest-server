const express = require('express')
const cors = require('cors')
const { connection } = require('../database/config')

class Server{
    constructor(){
        this.app = express()
        this.port = process.env.APP_PORT
        // this.dbconnect()
        this.middlewares()
        this.routes()
    }

    async dbconnect(){
        await connection()
    }

    middlewares(){
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use('/api/users',require('../routes/users'))
    }

    listen(){
        this.app.listen(this.port,() => console.log(`Server on port ${this.port}`))
    }
}

module.exports = new Server()