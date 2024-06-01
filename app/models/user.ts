import { Schema, model, models } from "mongoose";

export interface IUser {
    name: string;
    email: string;
    password: string;
}

const UserSchema = new Schema<IUser>({
    name: String,
    email: String,
    password: String
},{
    timestamps: true,
    toJSON: {
        versionKey: false,
        virtuals: true,
        transform: (_, ret) => {
            delete ret._id;
        },
    },
},);

const User = models.User || model('User', UserSchema);
export default User;