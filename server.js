require('dotenv').config();

const app = require('./src/app.js');
const connectDB = require('./src/db/db.js');

const PORT = process.env.PORT || 5000;

// Connect to Database & Start Server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to start server:', err);
    });
