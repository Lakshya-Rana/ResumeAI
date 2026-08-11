import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../../api/axios";

function Analyze() {
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB.");
      return;
    }

    setFile(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files[0];

    if (!droppedFile) return;

    if (droppedFile.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }

    if (droppedFile.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB.");
      return;
    }

    setFile(droppedFile);
  };

  const handleAnalyze = async () => {
  if (!title.trim()) {
    alert("Please enter a resume title.");
    return;
  }
  if (!file) {
    alert("Please upload your resume first.");
    return;
  }

  try {
    setUploading(true)
    const formData = new FormData();

    formData.append("resume", file);
    formData.append("title",title.trim())

    const response = await api.post(
      "/resumes/upload",
      formData
    );

    console.log("UPLOAD SUCCESS:", response.data);

    const resumeId = response.data.data._id;

    console.log("Resume ID:", resumeId);

    navigate(`${resumeId}/results`);

  } catch (error) {
    console.log("UPLOAD ERROR:", error);
    console.log("RESPONSE:", error.response?.data);

    alert(
      error.response?.data?.message ||
      "Failed to upload resume"
    );
  } finally {
    setUploading(false);
  }
};

  const removeFile = () => {
    setFile(null);
  };

  return (
    <div className="min-h-screen bg-black px-4 py-16 text-white sm:px-6">

      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="text-center">

          <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">
            Resume Analysis
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Analyze your resume
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Upload your resume and get AI-powered insights
            to improve your chances of landing an interview.
          </p>

        </div>

        <div className="mb-6">
  <label
    htmlFor="title"
    className="mb-2 block text-sm font-medium text-zinc-200"
  >
    Resume Title
  </label>

  <input
    id="title"
    type="text"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    placeholder="e.g. Frontend Developer Resume"
    className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-zinc-500"
  />
</div>

        {/* Upload Card */}
        <div className="mt-12">

          {!file ? (
            <label
              htmlFor="resume"
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              className={`flex min-h-[320px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 text-center transition ${
                dragActive
                  ? "border-white bg-zinc-900"
                  : "border-zinc-800 bg-zinc-950 hover:border-zinc-600"
              }`}
            >

              {/* Icon */}
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 text-2xl">
                📄
              </div>

              <h2 className="mt-6 text-xl font-semibold">
                Upload your resume
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                Drag & drop your PDF here or click to browse
              </p>

              <span className="mt-6 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200">
                Choose Resume
              </span>

              <p className="mt-4 text-xs text-zinc-600">
                PDF only · Maximum 5MB
              </p>

              <input
                id="resume"
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />

            </label>
          ) : (

            /* Selected File */
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">

              <div className="flex items-center justify-between gap-4">

                <div className="flex min-w-0 items-center gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
                    📄
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-medium">
                      {file.name}
                    </p>

                    <p className="mt-1 text-xs text-zinc-500">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={removeFile}
                  className="shrink-0 text-sm text-zinc-500 transition hover:text-white"
                >
                  Remove
                </button>

              </div>


              {/* Ready message */}
              <div className="mt-6 rounded-xl border border-zinc-800 bg-black p-4">

                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm text-black">
                    ✓
                  </div>

                  <div>
                    <p className="text-sm font-medium">
                      Resume ready
                    </p>

                    <p className="text-xs text-zinc-500">
                      Your resume is ready to be analyzed.
                    </p>
                  </div>
                </div>

              </div>


              {/* Analyze button */}
              <button
                onClick={handleAnalyze}
                disabled={uploading}
                className="mt-6 flex w-full items-center justify-center gap-3 rounded-lg bg-white py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-600"
              >
                {uploading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-400 border-t-black" />
                    Uploading resume...
                  </>
                ) : (
                  "Analyze Resume"
                    )}
              </button>

            </div>
          )}

        </div>


        {/* How it works */}
        <div className="mt-16 grid gap-4 sm:grid-cols-3">

          <Step
            number="01"
            title="Upload"
            description="Upload your resume as a PDF."
          />

          <Step
            number="02"
            title="Analyze"
            description="AI analyzes your resume."
          />

          <Step
            number="03"
            title="Improve"
            description="Get actionable feedback."
          />

        </div>

      </div>

    </div>
  );
}


function Step({ number, title, description }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
      <span className="text-xs font-medium text-zinc-600">
        {number}
      </span>

      <h3 className="mt-4 font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-zinc-500">
        {description}
      </p>
    </div>
  );
}

export default Analyze;