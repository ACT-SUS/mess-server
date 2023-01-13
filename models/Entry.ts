import { model, Schema } from 'mongoose';

const entrySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    numberOfGuests: {
        type: Number,
        default: 0,
    },
    extraFood: {
        type: Number,
        default: 0,
    },
    date: String,
    time: String,
});

const Entry = model('entry', entrySchema);

export default Entry;
