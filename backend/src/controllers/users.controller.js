import { User } from "../models/users.models.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const registerUser = asyncHandler(async (req, res) => {
    const { username, fullName, email, password } = req.body;

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new apiError(409, "User is already registered.");
    }

    const user = await User.create({
        fullName,
        email,
        password,
        username: username.toLowerCase()
    });

    const createdUser = await User
        .findById(user._id)
        .select("-password -refreshToken");

    if (!createdUser) {
        throw new apiError(
            500,
            "Something went wrong, user not registered."
        );
    }

    return res
        .status(201)
        .json(
            new apiResponse(
                201,
                createdUser,
                "User registered successfully."
            )
        );
});


const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new apiError(401, "User doesn't exist.");
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;

        await user.save({
            validateBeforeSave: false
        });

        return {
            accessToken,
            refreshToken
        };

    } catch (err) {
        throw new apiError(
            500,
            "Something went wrong while generating access and refresh tokens."
        );
    }
};


export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        throw new apiError(400, "Email is required.");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new apiError(401, "Invalid email or password.");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new apiError(401, "Invalid email or password.");
    }

    const {
        accessToken,
        refreshToken
    } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User
        .findById(user._id)
        .select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new apiResponse(
                200,
                {
                    user: loggedInUser
                },
                "User logged in successfully."
            )
        );
});


export const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken;

    if (!incomingRefreshToken) {
        throw new apiError(401, "Refresh token is required.");
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const user = await User.findById(decodedToken?.id);

        if (!user) {
            throw new apiError(401, "Refresh token is invalid.");
        }

        if (incomingRefreshToken !== user.refreshToken) {
            throw new apiError(401, "Refresh token is invalid.");
        }

        const {
            accessToken,
            refreshToken: newRefreshToken
        } = await generateAccessAndRefreshTokens(user._id);

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(
                new apiResponse(
                    200,
                    {
                        accessToken
                    },
                    "Access token refreshed successfully."
                )
            );

    } catch (err) {
        throw new apiError(
            401,
            "Something went wrong while refreshing access token."
        );
    }
});


export const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    );

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new apiResponse(
                200,
                {},
                "User logged out successfully."
            )
        );
});


export const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                req.user,
                "Current user fetched successfully."
            )
        );
});

export const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new apiError(400, "Email is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new apiError(404, "User not found");
    }

    return res.status(200).json(
        new apiResponse(
            200,
            "Password reset link generated successfully"
        )
    );
});

export const resetPassword = asyncHandler(async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
        throw new apiError(
            400,
            "Password and confirm password are required"
        );
    }

    if (password !== confirmPassword) {
        throw new apiError(400, "Passwords do not match");
    }

    if (password.length < 6) {
        throw new apiError(
            400,
            "Password must be at least 6 characters"
        );
    }

    const user = await User.findOne({
        email: email
    });

    if (!user) {
        throw new apiError(404, "User not found");
    }

    user.password = password;

    await user.save();

    return res.status(200).json(
        new apiResponse(
            200,
            {},
            "Password reset successfully"
        )
    );
});
