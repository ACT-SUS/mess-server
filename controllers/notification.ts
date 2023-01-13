import { Request, Response } from 'express';
import NotificationService from '../services/notification';
import Student from "../models/Student";

export const pushNotification = async (req: Request, res: Response) => {
    try {
        const { title, body, imageUrl } = req.body;
        await NotificationService.pushNotification(title, body, imageUrl);

        return res.status(200).json({ message: "successfully pushed notification" })
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

export const subscribeNotification = async (req: Request, res: Response) => {
    try {
        const { id, fcmToken } = req.body;
        await Student.findByIdAndUpdate(id, { fcmToken })

        return res.status(200).json({ message: "subscribed successfully" })
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: 'Internal server error',
        });
    }
}
