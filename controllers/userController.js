const Controller = require('./controller')

class UserController extends Controller{
    constructor(){
        super()
    }

    getUsers(req = this.req, res = this.res){
        res.json({
            total: 2,
            page: 1,
            perPage: 10,
            totalPages: 1,
            nextPage: null,
            prevPage: null,
            data: [
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
            ]
        })
    }

    postUser(req = this.req, res = this.res){
        const { name, age } = req.body
        res.json({
            message: 'Registered user successfully',
            data: [
                {
                    id: 3,
                    name: 'Lauren Cohan',
                    age: 30,
                }
            ]
        })
    }
}

module.exports = new UserController()