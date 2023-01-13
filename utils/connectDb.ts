import mongoose from 'mongoose';

const connectDb = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGO_URI!);
    console.log('Connected to database');
};

export default connectDb;
