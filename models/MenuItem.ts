import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    slug: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase: true 
    },
    description: { 
        type: String, 
        required: true, 
        trim: true, 
        maxLength: 200 
    },
    price: { 
        type: Number, 
        required: true, 
        min: 0 
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
    imageUrl: { type: String, required: true },
    available: { type: Boolean, default: true },
  },
  { timestamps: true } 
);

const MenuItem = mongoose.models?.MenuItem || mongoose.model("MenuItem", menuItemSchema);
export default MenuItem;