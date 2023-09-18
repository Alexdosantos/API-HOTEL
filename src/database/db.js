import mongoose from "mongoose";
class  Database {
    static initialize(){
        mongoose.connection.once("open"  , () => {
            console.log('Database connected');
        })
        mongoose.connect(process.env.DATABASE_URL)
    }
}

export {Database}