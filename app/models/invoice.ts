import mongoose, { Schema, model, models } from 'mongoose';

export interface IInvoice {
  customer: {};
  products: [];
  status: 'Pending' | 'Paid';
  paymentType: 'Card' | 'Cash';
}

const InvoiceSchema = new Schema<IInvoice>(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
    },
    products: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }],
    status: String,
    paymentType: String,
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

const Invoice = models.Invoice || model('Invoice', InvoiceSchema);
export default Invoice;
