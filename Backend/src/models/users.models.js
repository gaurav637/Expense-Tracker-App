import mongoose, { Mongoose } from 'mongoose';
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,
    },
    avatarImage: {
        type: String,
        default: "",
    },
    transactions: {
        type: mongoose.Types.ObjectId,
        ref: 'Expense'
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }},
    { timestamps: true } 
);

// Password hashing middleware before saving the user
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
  
// Compare entered password with the stored hash
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
  
// Generate JWT Token
userSchema.methods.generateAuthToken = function () {
const payload = { id: this._id };
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
return token;
};

const User = mongoose.model("User", userSchema);

export default User;