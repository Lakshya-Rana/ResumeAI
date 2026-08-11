import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        resumeUrl: {
            type: String,
            required: true
        },

        publicId: {
            type: String
        },

        extractedText: {
            type: String
        },

        analysis: {
            type: mongoose.Schema.Types.Mixed
        }
    },
    {
        timestamps: true
    }
);

export const Resume = mongoose.model("Resume", resumeSchema);