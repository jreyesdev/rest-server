const dotenv = require('dotenv').config()

if(dotenv.error) throw dotenv.error

const Server = require('./models/server')

Server.listen()