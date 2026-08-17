import mongoose from "mongoose";


const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: [
            2, "First name must be at least 2 characters"
        ],
        maxLength: [
            20, "First name cannot exceed 20 characters"
        ]
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minLength: [
            2, "Last name must be at least 2 characters"
        ],
        maxLength: [
            20, "Last name cannot exceed 20 characters"
        ]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowerCase: true,
        trim: true
    },
    password: {
        type: String,
        select: false,
        trim: true,
        minLength: [8, "Password must be at least 8 characters long"]
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    image: {
        type: String,
        default: null
    },
    authProviderId: { type: String }

});


const User = mongoose.models?.User || mongoose.model("User", userSchema);

export default User;