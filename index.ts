import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import {
    adminRoutes,
    entryRoutes,
    studentRoutes,
    settingRoutes,
    notificationRoutes,
} from './api';
import { connectDb, startCronjobs } from './utils';

dotenv.config();

const PORT = process.env.PORT;

const main = async () => {
    try {
        const app = express();
        connectDb();
        // startCronjobs();

        app.use(cors({ origin: '*' }));
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        // Routes
        app.use('/api/admin', adminRoutes);
        app.use('/api/entry', entryRoutes);
        app.use('/api/student', studentRoutes);
        app.use('/api/setting', settingRoutes);
        app.use('/api/notification', notificationRoutes);

        app.listen(PORT, () => {
            console.log(`Listening to port: ${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
};

main();
