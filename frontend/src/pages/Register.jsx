import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { validateRegister } from "../../utils/vaildators";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
   
  const handleSubmit = async (e) => {
  e.preventDefault();
  
  const error = validateRegister({
    username,
    email,
    password,
    confirmPassword,
  });

  if (error) {
    alert(error);
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    const response = await api.post("/users/register", {
      fullName,
      username,
      email,
      password,
    });

    console.log("Registered successfully:", response.data);

    // Only navigate after successful request
    navigate("/login");

  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Registration failed"
    );
  }
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="w-full max-w-md">

        <div className="mb-8 text-center">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight flex items-center justify-center gap-2 pt-4"
          >
            <img src="/job-search.png" alt="logo" className="w-10 h-full" />
            <span>ResumeAI</span>
          </Link>

          <h1 className="mt-6 text-3xl font-semibold">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Start analyzing your resume with AI.
          </p>
        </div>

        {/* Register Card */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl">

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Full Name */}
            <div>
              <label
                htmlFor="fullname"
                className="mb-2 block text-sm font-medium text-zinc-200"
              >
                Full Name
              </label>

              <input
                id="fullname"
                value={fullName}
                onChange={(e)=> setFullname(e.target.value)}
                type="text"
                placeholder="Enter your name"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-zinc-500"
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-zinc-200"
              >
                username
              </label>

              <input
                id="text"
                value={username}
                spellCheck="false"
                onChange={(e)=> setUsername(e.target.value)}
                type="text"
                placeholder="Enter your name"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-zinc-500"
              />
            </div>

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
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-zinc-500"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-zinc-200"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                placeholder="Create a password"
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
                onChange={(e)=> setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-zinc-500"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-white py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              Create Account
            </button>

          </form>

          {/* Login */}
          <p className="mt-6 text-center text-sm text-zinc-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-white hover:underline"
            >
              Sign in
            </Link>
          </p>

        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-zinc-600">
          By creating an account, you agree to our Terms and Privacy Policy.
        </p>

      </div>
    </div>
  );
}

export default Register;

