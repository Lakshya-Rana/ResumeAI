
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../../api/axios";

function Results() {
  const { resumeId } = useParams();

  const [result, setResult] = useState({
    score: 0,
    summary: "",
    strengths: [],
    weaknesses: [],
    missingSkills: [],
    suggestions: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {

        const response = await api.get(
          `/resumes/${resumeId}/results`
        );

        setResult(response.data.data);
      } catch (error) {
        console.log("RESULT ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [resumeId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <p className="text-zinc-400">Analyzing your resume...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-4 py-12 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
            Resume Analysis
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Your Resume Results
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
            Here's what our AI found in your resume and what you can improve.
          </p>
        </div>


        {/* Score */}
        <div className="mx-auto mt-10 max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-center">
          <p className="text-sm text-zinc-500">
            Resume Score
          </p>

          <div className="mt-4">
            <span className="text-7xl font-bold">
              {result.score}
            </span>

            <span className="ml-2 text-xl text-zinc-500">
              / 100
            </span>
          </div>

          <div className="mx-auto mt-6 h-2 w-full overflow-hidden rounded-full bg-zinc-800">
            <div
              className="h-full rounded-full bg-white transition-all"
              style={{
                width: `${Math.min(result.score, 100)}%`,
              }}
            />
          </div>
        </div>


        {/* Summary */}
        <section className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8">
          <h2 className="text-xl font-semibold">
            Summary
          </h2>

          <p className="mt-4 leading-7 text-zinc-400">
            {result.summary || "No summary available yet."}
          </p>
        </section>


        {/* Strengths & Weaknesses */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">

          {/* Strengths */}
          <ResultCard
            title="Strengths"
            items={result.strengths}
            emptyText="No strengths identified yet."
          />

          {/* Weaknesses */}
          <ResultCard
            title="Weaknesses"
            items={result.weaknesses}
            emptyText="No weaknesses identified yet."
          />

        </div>


        {/* Missing Skills */}
        <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8">

          <h2 className="text-xl font-semibold">
            Missing Skills
          </h2>

          {result.missingSkills.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-3">
              {result.missingSkills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-zinc-500">
              No missing skills identified yet.
            </p>
          )}

        </section>


        {/* Suggestions */}
        <section className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8">

          <h2 className="text-xl font-semibold">
            Suggestions
          </h2>

          {result.suggestions.length > 0 ? (
            <div className="mt-5 space-y-4">
              {result.suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex gap-4 rounded-xl border border-zinc-800 bg-black p-4"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-black">
                    {index + 1}
                  </span>

                  <p className="leading-6 text-zinc-400">
                    {suggestion}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-zinc-500">
              No suggestions available yet.
            </p>
          )}

        </section>


        {/* Resume ID */}
        <div className="mt-8 text-center">
          <button
          onClick={() => navigate("/my-resumes")}
          className="rounded-lg items-center justify-center border border-zinc-800 bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:border-zinc-600"
        >
          My Resumes
        </button>
        </div>

      </div>
    </div>
  );
}


function ResultCard({ title, items, emptyText }) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8">

      <h2 className="text-xl font-semibold">
        {title}
      </h2>

      {items.length > 0 ? (
        <ul className="mt-5 space-y-3">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex gap-3 text-sm leading-6 text-zinc-400"
            >
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-500" />

              <span>
                {item}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-zinc-500">
          {emptyText}
        </p>
      )}

    </section>
  );
}

export default Results;
