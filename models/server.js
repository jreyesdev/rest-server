const express = require('express')

class Server{
    constructor(){
        this.app = express()
        this.port = process.env.APP_PORT
        this.middlewares()
        this.routes()
    }

    middlewares(){
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.get('/',(req,res)=>{
            res.send('Hello Word')
        })
    }

    listen(){
        this.app.listen(this.port,() => console.log(`Server on port ${this.port}`))
    }
}

module.exports = new Server