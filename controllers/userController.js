const { request, response} = require('express')

class UserController{
    constructor(){
        this.req = request
        this.res = response
    }

    getUsers(req = this.req, res = this.res){
        res.json([
            {
                id: 1,
                name: 'John',
                age: 33,
            }
        ])
    }
}

module.exports = new UserController()