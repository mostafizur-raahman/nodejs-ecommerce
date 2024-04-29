import User from "../models/user.model.js";

import { successResponse, errorResponse } from "../helpers/responseHandler.js";

// for rgister
export const registerController = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            address,
            city,
            country,
            phone,
            profilePicture,
        } = req.body;

        // validation

        if (
            !name ||
            !email ||
            !password ||
            !address ||
            !city ||
            !country ||
            !phone
        ) {
            return res.send({
                success: false,
                message: "Please provides all fields",
            });
        }

        // existing user checking
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(500).send({
                success: false,
                message: "Email already exists",
            });
        }

        const _doc = {
            name,
            email,
            password,
            address,
            city,
            country,
            phone,
            profilePicture,
        };

        const user = await User.create(_doc);

        return successResponse(res, {
            statusCode: 200,
            message: "user creaated succesfully",
            payload: {
                user,
            },
        });
    } catch (error) {
        console.log(error);
        return errorResponse(res, {
            statusCode: 500,
            message: "user created failed",
        });
    }
};

// for login
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // validation
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: "All fileds are required",
            });
        }

        // check user
        const user = await User.findOne({ email });
        if (!user) {
            return errorResponse(res, {
                statusCode: 404,
                message: "user not found",
            });
        }

        // check password is valid
        const isPassValid = await user.comparePassword(password);
        if (!isPassValid) {
            return errorResponse(res, {
                statusCode: 500,
                message: "Invalid credentials",
            });
        }
        // projections
        const { password: _, ...userWithoutPassword } = user.toObject();

        //JWT
        const token = user.generateJWT();
        userWithoutPassword.token = token;
        res.cookie("token", token, {
            httpOnly: true, // Ensure cookie is only accessible via HTTP(S)
            secure: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        res.status(200).json({
            success: true,
            message: "user login succesfully",
            userWithoutPassword,
        });
    } catch (error) {
        console.log(error);
        return errorResponse(res, {
            statusCode: 500,
            message: "Failed to login, try again later",
        });
    }
};

// get user
export const getUserController = async (req, res) => {
    try {
        const allUser = await User.find({});
        console.log(allUser, "---");
        return successResponse(res, {
            statusCode: 200,
            message: "User fetched successfully",
            payload: allUser,
        });
    } catch (error) {
        console.log(error);
        return errorResponse(res, {
            statusCode: 500,
            message: "Failed to get user, try again later",
        });
    }
};

// update user
export const updateUserController = async (req, res) => {
    try {
        const userId = req.query.id;

        console.log(us);
        if (!userId) {
            return errorResponse(res, {
                statusCode: 400,
                message: "User ID is missing in the request",
            });
        }

        // Find the user by id
        const user = await User.findById(userId);

        // Check if the user exists
        if (!user) {
            return errorResponse(res, {
                statusCode: 404,
                message: "User not found",
            });
        }

        const { name, profilePicture } = req.body;

        if (name) user.name = name;
        if (profilePicture) user.profilePicture = profilePicture;

        await user.save();

        return successResponse(res, {
            statusCode: 200,
            message: "User update successfully",
        });
    } catch (error) {
        console.log(error);
        return errorResponse(res, {
            statusCode: 500,
            message: "Failed to get user, try again later",
        });
    }
};
