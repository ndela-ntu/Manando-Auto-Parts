import { Schema, model, models } from "mongoose";

export interface ISellItem {
  imageURL: string;
  username: string;
  email?: string;
  phoneNumber?: number;
}

const SellItemSchema = new Schema<ISellItem>({
    imageURL: String,
    username: String,
    email: String,
    phoneNumber: Number
}, {
    timestamps: true,
    toJSON: {
        versionKey: false,
        virtuals: true,
        transform: (_, ret) => {
            delete ret._id;
        },
    },
})

const SellItem = models.SellItemSchema || model('SellItem', SellItemSchema);
export default SellItem;