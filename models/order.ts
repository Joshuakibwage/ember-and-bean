import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    items: [
      {
        slug: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
        servedAs: { type: String, enum: ["hot", "iced"] },
      },
    ],

    fulfillment: {
      method: { type: String, enum: ["pickup", "delivery"], required: true },
      address: {
        line1: { type: String, trim: true },
        city: { type: String, trim: true },
        notes: { type: String, trim: true },
      },
    },

    contact: {
      fullName: { type: String, required: true, trim: true },
      phone: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true },
    },

    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, default: 0 },
    total: { type: Number, required: true },

    status: {
      type: String,
      enum: ["pending", "paid", "preparing", "ready", "completed", "cancelled"],
      default: "pending",
    },

    payment: {
      provider: { type: String, default: "paystack" },
      reference: { type: String, required: true, unique: true },
      status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
    },
  },
  { timestamps: true }
);

const Order = mongoose.models?.Order || mongoose.model("Order", orderSchema);

export default Order;