import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI as string;

mongoose.connect(DB_URI)
    .then(() => {
        console.log('Connected to MongoDB');

    })
    .catch(err => {
        console.error('Database connection error:', err);
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});