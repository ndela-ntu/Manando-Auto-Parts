import { Schema, models, model } from "mongoose";

export interface IAddress {
    streetAddress: string;
    city: string;
    postalCode: number;
}

const AddressSchema = new Schema<IAddress>({
    streetAddress: String,
    city: String,
    postalCode: Number,
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

const Address = models.Address || model('Address', AddressSchema);
export default Address;