const mongoose = require('mongoose')

class DBMongo{    
    async connection(){
        const { 
            DB_CLUSTER: cluster, 
            DB_NAME: database, 
            DB_USERNAME: username, 
            DB_PASS: pass } = process.env

        let url = `mongodb+srv://${username}:${pass}@${cluster}/${database}?retryWrites=true&w=majority`
        
        try{
            await mongoose.connect(url,{
                useNewUrlParser: true,
                useUnifiedTopology: true,
                //useCreateIndex: true,
                //useFindAndModify: false
            })

            console.log('DB is connected')            
        }catch(err){
            console.error('Error to connect database')
            console.error(err)
            throw new Error(err)
        }
    }
}

module.exports = new DBMongo()