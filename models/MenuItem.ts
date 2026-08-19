import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true, trim: true, maxLength: 200 },

    price: { type: Number, required: true, min: 0 },
    compareAtPrice: {
      type: Number,
      min: 0,
      validate: {
        validator: function (this: { price: number }, value: number) {
          
          return value == null || value > this.price;
        },
        message: "compareAtPrice must be greater than price, or omitted entirely.",
      },
    },

    category: {
      type: String,
      enum: ["coffee", "pastry", "cake"],
      required: true,
    },
    servedAs: {
      type: [String],
      enum: ["hot", "iced"],
      default: undefined,
    },
    dietaryTags: {
      type: [String],
      enum: ["vegan", "gluten-free", "dairy-free", "nut-free"],
      default: [],
    },

    ingredients: { type: [String], default: [] },
    allergens: {
      type: [String],
      enum: ["nuts", "dairy", "gluten", "soy", "eggs"],
      default: [],
    },
    calories: { type: Number, min: 0 },

    imageUrl: { type: String, required: true },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const MenuItem = mongoose.models?.MenuItem || mongoose.model("MenuItem", menuItemSchema);
export default MenuItem;