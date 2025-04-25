import dotenv from 'dotenv';
import express from 'express';
import connectDB from './src/config/db.js';
import bodyParser from 'body-parser';
import logger from './src/utils/logger.js';

const app = express();

dotenv.config();
app.use(bodyParser.json());
const PORT = process.env.PORT || 4040;
const start = async ()=> {
    connectDB();
    app.listen(PORT, () => {
        logger.info(`Server running on http://localhost:${PORT}`);
    });
}

start();