import * as Mongoose from 'mongoose';

export let db: Mongoose.Connection;

export const connect = () => {
    const uri = 'mongodb://' + process.env.DB_HOST + ":" + process.env.DB_PORT;
    // const uri = 'mongodb://localhost:3000';
    if (db) return;

    Mongoose.connect(uri, {
        dbName: process.env.DB_DBNAME,
        user: process.env.DB_USER,
        pass: process.env.DB_PWD,
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });

    db = Mongoose.connection;

    db.once("open", () => {
        console.log("Connected to database");
    });
    db.on("error", () => {
        console.log("Error connecting to database");
    });
}

export const disconnect = () => {
    if (!db) {
      return;
    }
    Mongoose.disconnect();
};
  