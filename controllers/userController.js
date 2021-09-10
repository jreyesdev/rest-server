const Controller = require('./controller')

class UserController extends Controller{
    constructor(){
        super()
    }

    getUsers(req = this.req, res = this.res){
        res.json([
            {
                id: 1,
                name: 'John Doe',
                age: 33,
            },
            {
                id: 2,
                name: 'Paul Smith',
                age: 28,
            }
        ])
    }
}

module.exports = new UserController()