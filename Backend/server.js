import dotenv from 'dotenv';
import express from 'express';
import connectDB from './src/config/db.js';
import bodyParser from 'body-parser';
import logger from './src/utils/logger.js';
import router from './src/routes/index.js';

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use("/api", router);
dotenv.config();
const PORT = process.env.PORT || 4040;
const start = async ()=> {
    connectDB();
    app.listen(PORT, () => {
        logger.info(`Server running on http://localhost:${PORT}`);
    });
}

start();