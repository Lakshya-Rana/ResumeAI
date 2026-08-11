import { useState } from "react";
import { Link,useNavigate } from "react-router";
import { validateLogin } from "../../utils/vaildators";
import api from "../../api/axios";

function Login() {
  const navigate=useNavigate()
  const [password,setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateLogin({
      email,
      password
    })
    if(error){
      alert(error);
      return;
    }

    try {
      const response = await api.post("/users/login", {
        email,
        password,
      });

      console.log("Login successful:", response.data);

      // JWT cookies are set by the backend
      navigate("/");

    } catch (error) {
      console.log("LOGIN ERROR:", error);
      console.log("RESPONSE:", error.response?.data);

      alert(
        error.response?.data?.message ||
        "Login failed"
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
            className="text-2xl font-bold tracking-tight flex items-center justify-center gap-2 pt-4"
          >
            <img src="/job-search.png" alt="logo" className="w-10 h-full" />
            <span>ResumeAI</span>
          </Link>

          <h1 className="mt-6 text-3xl font-semibold">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Sign in to continue analyzing your resumes.
          </p>
        </div>

        {/* Login Card */}
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
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-zinc-500"
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-zinc-200"
                >
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs text-zinc-400 hover:text-white"
                >
                  Forgot password?
                </Link>
              </div>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-zinc-500"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-white py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              Sign In
            </button>

          </form>

          {/* Register */}
          <p className="mt-6 text-center text-sm text-zinc-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-white hover:underline"
            >
              Create account
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}

export default Login;
