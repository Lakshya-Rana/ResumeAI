import mongoose from "mongoose";
import { Resume } from "../models/resume.models.js";
import { apiError } from "../utils/apiError.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import { PDFParse } from "pdf-parse";
import { analyzeWithAI } from "../utils/ai.js";

export const uploadResume = asyncHandler(async (req, res) => {
const { title } = req.body;

if (!req.file) {
    throw new apiError(400, "Resume file required.");
}

const fileLocalPath = req.file.path;

if (!fileLocalPath) {
    throw new apiError(400, "Resume file is required.");
}

const parser = new PDFParse({
    url: fileLocalPath
});

let extractedText;

try {
    const result = await parser.getText();

    if (!result.text || !result.text.trim()) {
        throw new apiError(
            400,
            "Could not extract text from this resume."
        );
    }

    extractedText = result.text;
} finally {
    await parser.destroy();
}

const uploadedFile = await uploadOnCloudinary(fileLocalPath);

if (!uploadedFile) {
    throw new apiError(
        400,
        "Failed to upload resume on Cloudinary."
    );
}

const resume = await Resume.create({
    owner: req.user._id,
    title,
    resumeUrl: uploadedFile.secure_url,
    publicId: uploadedFile.public_id,
    extractedText
});

if (!resume) {
    throw new apiError(
        500,
        "Something went wrong while creating resume."
    );
}

return res
    .status(201)
    .json(
        new apiResponse(
            201,
            resume,
            "Resume uploaded successfully."
        )
    );


});

export const getMyResumes = asyncHandler(async(req,res)=>{
    const resumes = await Resume.aggregate([
        {
            $match: {
                owner: req.user._id
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        }
    ])
    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                resumes,
                "Resumes fetched successfully."
            )
        );
})

export const getResumeById = asyncHandler(async (req, res) => {
    const { resumeId } = req.params;

    const resume = await Resume.findById(resumeId);

    if (!resume) {
        throw new apiError(404, "Resume not found.");
    }

    if (resume.owner.toString() !== req.user._id.toString()) {
        throw new apiError(403, "You are not allowed to access this resume.");
    }

    return res
        .status(200)
        .json(
            new apiResponse(
                200,
                resume,
                "Resume fetched successfully."
            )
        );
});

export const extractResumeText = asyncHandler(async (req, res) => {
    const { resumeId } = req.params;

    const resume = await Resume.findById(resumeId);

    if (!resume) {
        throw new apiError(404, "Resume not found.");
    }

    if (resume.owner.toString() !== req.user._id.toString()) {
        throw new apiError(
            403,
            "You are not allowed to access this resume."
        );
    }

    const pdfUrl = resume.resumeUrl;

    if (!pdfUrl) {
        throw new apiError(404, "Resume PDF not found.");
    }

    const parser = new PDFParse({
        url: pdfUrl
    });

    try {
        const result = await parser.getText();

        if (!result.text || !result.text.trim()) {
            throw new apiError(
                400,
                "Could not extract text from this resume."
            );
        }

        resume.extractedText = result.text;

        await resume.save();

        return res
            .status(200)
            .json(
                new apiResponse(
                    200,
                    result.text,
                    "Resume extracted successfully."
                )
            );
    } finally {
        await parser.destroy();
    }
});

export const analyzeResume = asyncHandler(async(req,res)=>{
    const { resumeId } = req.params;

    const resume = await Resume.findById(resumeId);

    if (!resume) {
        throw new apiError(404, "Resume not found.");
    }

    if (resume.owner.toString() !== req.user._id.toString()) {
        throw new apiError(
            403,
            "You are not allowed to access this resume."
        );
    }
    
    if (!resume.extractedText) {
    throw new apiError(400, "Resume text has not been extracted yet.");
}
    if (resume.analysis) {
    return res.status(200).json(
      new apiResponse(
        200,
        resume.analysis,
        "Resume analysis already exists"
      )
    );
    }
    const analysis = await analyzeWithAI(resume.extractedText)

if(!analysis){
    throw new apiError(400,"Unable to fetch information.")
}

resume.analysis = analysis
await resume.save();

return res
    .status(200)
    .json(new apiResponse(
        200,
        analysis,
        "Resume analyzed successfully."
    ))
})

export const deleteResume = asyncHandler(async (req, res) => {
  const { resumeId } = req.params;

  // Find resume
  const resume = await Resume.findById(resumeId);
    console.log(resume)
  if (!resume) {
    throw new apiError(404, "Resume not found.");
  }

  // Make sure the resume belongs to the logged-in user
  if (resume.owner.toString() !== req.user._id.toString()) {
    throw new apiError(
      403,
      "You are not allowed to delete this resume."
    );
  }

  // Delete file from Cloudinary
  await deleteFromCloudinary(resume.publicId);

  // Delete resume from MongoDB
  await Resume.findByIdAndDelete(resumeId);

  return res
    .status(200)
    .json(
      new apiResponse(
        200,
        null,
        "Resume deleted successfully."
      )
    );
});