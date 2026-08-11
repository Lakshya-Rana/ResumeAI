import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../../api/axios";
import { validateResetPassword } from "../../utils/vaildators";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email,setEmail]=useState("")

 const handleSubmit = async (e) => {
  e.preventDefault();

  const error = validateResetPassword(
   { email,
    password,
    confirmPassword}
  );

  if (error) {
    alert(error);
    return;
  }

  try {
    const response = await api.post(
      "/users/reset-password",
      {
        email: email.trim(),
        password,
        confirmPassword
      }
    );

    console.log(
      "Password reset successfully:",
      response.data
    );

    alert("Password reset successfully!");

    navigate("/login");

  } catch (error) {
    console.log("RESET PASSWORD ERROR:", error);
    console.log("RESPONSE:", error.response?.data);

    alert(
      error.response?.data?.message ||
      "Unable to reset password"
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
            Reset your password
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Create a new password for your account.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl">

          <form onSubmit={handleSubmit} className="space-y-5">

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
            {/* New Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-zinc-200"
              >
                New Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                required
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-zinc-500"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-zinc-200"
              >
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-zinc-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-lg bg-white py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              Reset Password
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

export default ResetPassword;
