import mongoose, { Schema, model, models } from 'mongoose';

export interface ICustomer {
  fullNames: string;
  email: string;
  phoneNumber: number;
  address: {};
}

const CustomerSchema = new Schema<ICustomer>(
  {
    fullNames: String,
    email: String,
    phoneNumber: Number,
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
    },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (_, ret) => {
        delete ret._id;
      },
    },
  },
);

const Customer = models.Customer || model('Customer', CustomerSchema);
export default Customer;
