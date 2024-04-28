import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"],
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: [true, "email already taken"],
        },
        password: {
            type: String,
            required: [true, "password is required"],
            minLength: [6, "minimum password length is 6"],
        },
        address: {
            type: String,
            required: [true, "address is required"],
        },
        city: {
            type: String,
            required: [true, "city name is required"],
        },
        country: {
            type: String,
            required: [true, "country name is required"],
        },
        phone: {
            type: String,
            required: [true, "phone numeber is required"],
        },
        profilePicture: {
            type: String,
        },
    },
    { timestamps: true }
);

// hash function
userSchema.pre("save", async function (next) {
    // if pass is not modifies
    if (!this.isModified("password")) return next();

    try {
        this.password = await bcrypt.hash(this.password, 10);
        next(); // Call next to pass control to the next middleware
    } catch (error) {
        next(error); // Pass any error to the next middleware
    }
});

// compare function for login
userSchema.methods.comparePassword = async function (plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
};

// JWT token
userSchema.methods.generateJWT = function () {
    return JWT.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};
const User = mongoose.model("User", userSchema);

export default User;
