const mongoose = require('mongoose')

class DBMongo{
    constructor(){
        this.name = process.env.DB_NAME
        this.user = process.env.DB_USERNAME
        this.pass = process.env.DB_PASS
        this.cluster = process.env.DB_CLUSTER
    }

    get urlCluster(){
        return `mongodb+srv://${this.user}:${this.pass}@${this.cluster}/${this.name}?retryWrites=true&w=majority`
    }

    async connection(){
        try{
            await mongoose.connect(this.urlCluster(),{
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            })

            console.log('DB is connected')
            
        }catch(err){
            console.error(err)
            throw new Error(err)
        }
    }
}

module.exports = new DBMongo()