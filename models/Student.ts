import { model, Schema } from 'mongoose';

import { StudentStatus } from '../enums';

const studentSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    sid: {
        type: String,
        required: true,
    },
    feeReceipt: String,
    status: {
        type: String,
        default: StudentStatus.PENDING,
    },
    password: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
    expense: {
        type: Number,
        default: 0,
    },
    fcmToken: {
        type: String,
        required: true
    }
});

const Student = model('student', studentSchema);

export default Student;
