const { request, response} = require('express')

class Controller{
    constructor(){
        this.req = request
        this.res = response
    }
}

module.exports = Controller