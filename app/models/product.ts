import mongoose, { Schema, model, models } from "mongoose";

export interface IProduct {
    id: mongoose.Schema.Types.ObjectId;
    name: string;
    description: string;
    price: number;
    imageURL: string;
    imagePublicId: string;
    category: string;
    quantity: number;
}

const ProductSchema = new Schema<IProduct>({
    name: String,
    description: String,
    price: Number,
    imageURL: String,
    imagePublicId: String,
    category: String,
    quantity: Number,
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

ProductSchema.index({name: 'text', description: 'text'});

const Product = models.Product || model('Product', ProductSchema);
export default Product;