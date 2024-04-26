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
            return res.status(404).send({
                success: false,
                message: "Please rigister first to login",
            });
        }

        // check password is valid
        const isPassValid = await user.comparePassword(password);
        if (!isPassValid) {
            return res.status(500).send({
                success: false,
                message: "Invalid credentials",
            });
        }
        res.status(200).send({
            success: true,
            message: "user login successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        return errorResponse(res, {
            statusCode: 500,
            message: "Failed to login, try again later",
        });
    }
};
