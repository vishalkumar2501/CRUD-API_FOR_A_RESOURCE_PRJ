require('dotenv').config();

const app = require('./src/app.js');
const connectDB = require('./src/db_01/db.js');

connectDB();




app.listen(5000, () => {
    console.log(`server isn running on port no :5000`);
})
