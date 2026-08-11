import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { validateForgotPassword } from "../../utils/vaildators";
import api from "../../api/axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    const error = validateForgotPassword(email);

    if (error) {
      alert(error);
      return;
    }

    try {
      const response = await api.post(
        "/users/forgot-password",
        {
          email: email.trim(),
        }
      );

      console.log(
        "Reset link generated:",
        response.data
      );

      // Dummy reset flow
      navigate("/reset-password");

    } catch (error) {
      console.log("FORGOT PASSWORD ERROR:", error);
      console.log(
        "RESPONSE:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
        "Unable to process request"
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="mb-8 text-center">
          <Link
          to="/"
          className="flex justify-center items-center gap-2 text-xl font-bold tracking-tight "
        >
            <img src="/src/assets/job-search.png" alt="logo" className="w-10 h-full" />
            <span>ResumeAI</span>
        </Link>

          <h1 className="mt-6 text-3xl font-semibold">
            Forgot your password?
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Enter your email and we'll help you reset your password.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl">

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-zinc-200"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-zinc-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-lg bg-white py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              Send Reset Link
            </button>

          </form>

          {/* Back to Login */}
          <p className="mt-6 text-center text-sm text-zinc-400">
            Remember your password?{" "}
            <Link
              to="/login"
              className="font-medium text-white hover:underline"
            >
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
