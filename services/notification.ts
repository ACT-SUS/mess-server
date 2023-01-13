import admin from 'firebase-admin';
import serviceAccount from '../firebase.json';
import { Student } from '../models';

class NotificationService {
    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    }

    pushNotification = async (
        title: string,
        body: string,
        imageUrl: string
    ) => {
        try {
            const students = await Student.find(
                { fcmToken: { $exists: true } },
                'fcmToken'
            );
            const tokens = students.map((std) => std.fcmToken);
            await admin.messaging().sendMulticast({
                tokens,
                notification: {
                    title,
                    body,
                    imageUrl,
                },
            });
        } catch (err) {
            console.error('PUSH NOTIFICATION ERROR: ', err);
        }
    };
}

export default new NotificationService();
