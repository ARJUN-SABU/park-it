const { MongoClient } = require("mongodb");

let dbConnection;
let uri =
  "mongodb+srv://arjunsabu:arjunsabu123@cluster0.ruv2j3v.mongodb.net/parking-data?retryWrites=true&w=majority";

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(uri)
      .then((client) => {
        dbConnection = client.db();
        return cb();
      })
      .catch((err) => {
        console.log(err);
        return cb(err);
      });
  },
  getDb: () => dbConnection,
};
