import { model, Schema } from 'mongoose';

const nonvegSchema = new Schema({
    date: {
        type: String,
        required: true,
        default: new Date().toLocaleDateString('en-GB'),
    },
    sid: {
        type: Number,
        required: true,
    },
    numberOfPieces: {
        type: Number,
        default: 0,
        required: true,
    },
});

export default model('nonveg', nonvegSchema);
