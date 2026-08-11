
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../../api/axios";

function MyResumes() {
  const navigate = useNavigate();

    const[deleteId,setDeleteId] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's resumes
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await api.get("/resumes/my-resumes");

        console.log("MY RESUMES:", response.data);

        setResumes(response.data.data || []);
      } catch (error) {
        console.log("MY RESUMES ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, []);

  // Delete resume
  const handleDelete = async (resumeId) => {
    setDeleteId(resumeId)
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmDelete) return;

    try {
      await api.post(`/resumes/${resumeId}/delete`);

      setResumes((prev) =>
        prev.filter((resume) => resume._id !== resumeId)
      );

    } catch (error) {
      console.log("DELETE RESUME ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete resume"
      );
    }finally{
        setDeleteId(null)
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">

          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-zinc-800 border-t-white" />

          <p className="mt-4 text-sm text-zinc-500">
            Loading your resumes...
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-4 py-12 text-white sm:px-6">

      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
              Your documents
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              My Resumes
            </h1>

            <p className="mt-3 text-zinc-400">
              Manage and analyze your uploaded resumes.
            </p>

          </div>

          <button
            onClick={() => navigate("/analyze")}
            className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            + Analyze Resume
          </button>

        </div>

        {/* Empty State */}
        {resumes.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-950 p-12 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 text-2xl">
              📄
            </div>

            <h2 className="mt-6 text-xl font-semibold">
              No resumes yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
              Upload your first resume and get AI-powered
              feedback on your skills, strengths and weaknesses.
            </p>

            <button
              onClick={() => navigate("/analyze")}
              className="mt-6 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              Upload Resume
            </button>

          </div>
        ) : (

          /* Resume List */
          <div className="mt-10 space-y-4">

            {resumes.map((resume) => {

              const isAnalyzed =
                resume.analysis &&
                Object.keys(resume.analysis).length > 0;

              return (
                <div
                  key={resume._id}
                  className="
                    rounded-2xl
                    border border-zinc-800
                    bg-zinc-950
                    p-5
                    transition
                    hover:border-zinc-700
                    sm:p-6
                  "
                >

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    {/* Resume Information */}
                    <div className="flex min-w-0 items-center gap-4">

                      {/* PDF Icon */}
                      <div
                        className="
                          flex h-12 w-12 shrink-0
                          items-center justify-center
                          rounded-xl
                          border border-zinc-800
                          bg-zinc-900
                          text-xl
                        "
                      >
                        📄
                      </div>

                      {/* Title + Date */}
                      <div className="min-w-0">

                        <h2 className="truncate font-semibold text-white">
                          {resume.title || "Untitled Resume"}
                        </h2>

                        <p className="mt-1 text-sm text-zinc-500">
                          Updated{" "}
                          {resume.updatedAt
                            ? new Date(
                                resume.updatedAt
                              ).toLocaleDateString(
                                "en-IN",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )
                            : "Recently"}
                        </p>

                      </div>

                    </div>

                    {/* Right Side */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

                      {/* Status */}
                      {isAnalyzed ? (
                        <div className="flex items-center gap-2">

                          <span className="h-2 w-2 rounded-full bg-green-500" />

                          <span className="text-sm text-zinc-400">
                            Analyzed
                          </span>

                          {typeof resume.analysis.score === "number" && (
                            <span className="font-semibold text-white">
                              {resume.analysis.score}/100
                            </span>
                          )}

                        </div>
                      ) : (
                        <div className="flex items-center gap-2">

                          <span className="h-2 w-2 rounded-full bg-zinc-600" />

                          <span className="text-sm text-zinc-500">
                            Not analyzed
                          </span>

                        </div>
                      )}

                      {/* Buttons */}
                      <div className="flex gap-2">

                        {isAnalyzed ? (
                          <button
                            onClick={() =>
                              navigate(
                                `/analyze/${resume._id}/results`
                              )
                            }
                            className="
                              rounded-lg
                              bg-white
                              px-4 py-2.5
                              text-sm font-semibold
                              text-black
                              transition
                              hover:bg-zinc-200
                            "
                          >
                            View Results
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              navigate("/analyze")
                            }
                            className="
                              rounded-lg
                              border border-zinc-800
                              bg-zinc-900
                              px-4 py-2.5
                              text-sm font-semibold
                              text-white
                              transition
                              hover:border-zinc-600
                            "
                          >
                            Analyze
                          </button>
                        )}

                        <button
                          onClick={() =>
                            handleDelete(resume._id)
                          }
                          disabled = {deleteId === resume._id}
                          className="
                            rounded-lg
                            border border-zinc-800
                            px-4 py-2.5
                            text-sm
                            text-zinc-500
                            transition
                            hover:border-red-900
                            hover:text-red-400
                          "
                        >
                          {deleteId === resume._id ? "Deleting....": "Delete"}
                        </button>

                      </div>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>

    </div>
  );
}

export default MyResumes;
