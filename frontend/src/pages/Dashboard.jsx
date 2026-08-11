import { Link } from "react-router";

function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* Hero */}
      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 pb-24 pt-24 text-center">

        <div className="mb-6 rounded-full border border-zinc-800 bg-zinc-950 px-4 py-2 text-sm text-zinc-400">
          AI-powered resume analysis
        </div>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Analyze your resume.
          <span className="block text-zinc-500">
            Improve your chances.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
          Get instant AI-powered feedback on your resume.
          Discover your strengths, identify weaknesses, and
          make your resume stand out.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/analyze"
            className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            Analyze My Resume
          </Link>

          <a
            href="#how-it-works"
            className="rounded-lg border border-zinc-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-900"
          >
            How it works
          </a>
        </div>

      </section>


      {/* How it works */}
      <section
        id="how-it-works"
        className="border-y border-zinc-900 bg-zinc-950"
      >
        <div className="mx-auto max-w-6xl px-6 py-20">

          <div className="mb-12 text-center">
            <p className="text-sm font-medium text-zinc-500">
              SIMPLE PROCESS
            </p>

            <h2 className="mt-3 text-3xl font-semibold">
              How it works
            </h2>

            <p className="mt-3 text-zinc-400">
              Get useful insights from your resume in three steps.
            </p>
          </div>


          <div className="grid gap-6 md:grid-cols-3">

            {/* Step 1 */}
            <div className="rounded-2xl border border-zinc-800 bg-black p-6">
              <span className="text-sm text-zinc-500">
                01
              </span>

              <h3 className="mt-5 text-xl font-semibold">
                Upload
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Upload your resume as a PDF and let ResumeAI
                process it.
              </p>
            </div>


            {/* Step 2 */}
            <div className="rounded-2xl border border-zinc-800 bg-black p-6">
              <span className="text-sm text-zinc-500">
                02
              </span>

              <h3 className="mt-5 text-xl font-semibold">
                Analyze
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Our AI analyzes your skills, experience,
                projects, and resume structure.
              </p>
            </div>


            {/* Step 3 */}
            <div className="rounded-2xl border border-zinc-800 bg-black p-6">
              <span className="text-sm text-zinc-500">
                03
              </span>

              <h3 className="mt-5 text-xl font-semibold">
                Improve
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Get actionable suggestions to make your resume
                stronger.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-20">

        <div className="mb-12">
          <p className="text-sm font-medium text-zinc-500">
            WHAT WE ANALYZE
          </p>

          <h2 className="mt-3 text-3xl font-semibold">
            Everything that matters
          </h2>

          <p className="mt-3 max-w-xl text-zinc-400">
            ResumeAI looks beyond simple keyword matching.
          </p>
        </div>


        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <Feature title="Skills" />
          <Feature title="Experience" />
          <Feature title="Projects" />
          <Feature title="Resume Structure" />

        </div>

      </section>


      {/* CTA */}
      <section className="border-t border-zinc-900">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">

          <h2 className="text-3xl font-semibold sm:text-4xl">
            Ready to improve your resume?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-zinc-400">
            Upload your resume and get AI-powered feedback
            in seconds.
          </p>

          <Link
            to="/analyze"
            className="mt-8 inline-block rounded-lg bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            Analyze My Resume
          </Link>

        </div>
      </section>

    </div>
  );
}


function Feature({ title }) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 transition hover:border-zinc-700">
      <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 text-sm text-zinc-400">
        ✓
      </div>

      <h3 className="font-medium">
        {title}
      </h3>
    </div>
  );
}

export default Dashboard;