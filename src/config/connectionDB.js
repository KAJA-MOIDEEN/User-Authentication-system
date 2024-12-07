const mongoose = require('mongoose');
const connectionDB = ()=>{
    mongoose.connect(process.env.MONGOURL)
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));
}
module.exports = connectionDB