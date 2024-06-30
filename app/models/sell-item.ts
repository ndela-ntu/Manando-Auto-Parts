import { Schema, model, models } from "mongoose";

export interface ISellItem {
  imagePublicId: string;
  imageURL: string;
  fullNames: string;
  email?: string;
  phoneNumber?: number;
}

const SellItemSchema = new Schema<ISellItem>({
    imagePublicId: String,
    imageURL: String,
    fullNames: String,
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

const SellItem = models.SellItemSchema
export default SellItem;