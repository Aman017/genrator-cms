const mongoose= require("mongoose")

require('dotenv').config();

const mongoURL = process.env.MONGO_URL
async function db() {
if(mongoose.connection.readyState=== 1){
    console.log("already to connected o database, disconnecting first")
    await mongoose.disconnect()
}
    if(!mongoURL){
        console.log('MONGO url is not set in env file')
    }

mongoose.connect(mongoURL).then(()=>{
    const databaseName = mongoose.connection.db.databaseName;
    console.log(`Data base connected successfully to ${databaseName}`)
}).catch((e)=>{
    console.log(`Error in connecting to the database: ${e.message}`)
})
    
}

module.exports = db;
