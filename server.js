require('dotenv').config();

const app = require('./src/app.js');
const connectDB = require('./src/db/db.js');

connectDB();




app.listen(process.env.PORT, () => {
    console.log(`server isn running on port no :${process.env.PORT}`);
})
