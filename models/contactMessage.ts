import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
        maxLength: 1000,
    },
    status: {
        type: String,
        enum: ["new", "read"],
        default: "new",
    }
}, { timestamps: true });


const contactMessage = mongoose.models?.contactMessage || mongoose.model("contactMessage", contactMessageSchema);

export default contactMessage;