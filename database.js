const mongoose = require('mongoose');
const localhost_db_uri = 'mongodb://localhost:27017/futureTrading';
const server_db_uri = process.env.MONGODB_URI;

//DB Connection
mongoose.connect(server_db_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database created or connected successfully")
}).catch((error) => {
    console.log(error);
})

module.exports = mongoose;