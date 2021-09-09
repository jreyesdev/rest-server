class UserController{

    getUsers(req, res){
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