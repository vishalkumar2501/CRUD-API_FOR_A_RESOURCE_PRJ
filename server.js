require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/db_01/db');

const PORT = process.env.PORT || 3000;

// Connect to MongoDB first, then start listening
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
}).catch((err) => {
    console.error('Failed to start server:', err.message);
});
