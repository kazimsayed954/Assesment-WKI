import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    name: string;
    age: number;
    city: string;
    zipCode: string;
    deleted: boolean; 
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
    deleted: { type: Boolean, default: false } 
});

export default mongoose.model<IUser>('User', UserSchema);
