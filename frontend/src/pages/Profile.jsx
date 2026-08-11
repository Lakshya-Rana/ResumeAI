
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../../api/axios";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);

  // Fetch current logged-in user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await api.get("/users/get-current-user");

        console.log("CURRENT USER:", response.data);

        setUser(response.data.data);
      } catch (error) {
        console.log("CURRENT USER ERROR:", error);

        if (error.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [navigate]);

  // Logout
  const handleLogout = async () => {
    try {
      setLogoutLoading(true);

      await api.post("/users/logout");

      navigate("/login");
    } catch (error) {
      console.log("LOGOUT ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Failed to logout"
      );
    } finally {
      setLogoutLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-zinc-800 border-t-white" />

          <p className="mt-4 text-sm text-zinc-500">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  // If no user was returned
  if (!user) {
    return null;
  }

  // Avatar letter
  
  return (
    <div className="min-h-screen bg-black px-4 py-12 text-white sm:px-6">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-zinc-500">
            Account
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Profile
          </h1>

          <p className="mt-3 text-zinc-400">
            Manage your account and security settings.
          </p>
        </div>

        {/* Main Profile Card */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">

          {/* Profile Header */}
          <div className="border-b border-zinc-800 p-6 sm:p-8">
            <div className="flex items-center gap-5">

              <div className="min-w-0">

                <h2 className="truncate text-xl font-semibold">
                  {user.fullName}
                </h2>

                <p className="mt-1 truncate text-sm text-zinc-500">
                  @{user.username}
                </p>

              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="p-6 sm:p-8">

            <h2 className="text-lg font-semibold">
              Account Information
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Your basic account information.
            </p>

            <div className="mt-6 space-y-5">

              {/* Name */}
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-600">
                  Name
                </p>

                <div className="mt-2 rounded-lg border border-zinc-800 bg-black px-4 py-3 text-sm text-zinc-300">
                  {user.fullName}
                </div>
              </div>

              {/* Username */}
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-600">
                  Username
                </p>

                <div className="mt-2 flex items-center rounded-lg border border-zinc-800 bg-black px-4 py-3 text-sm text-zinc-300">
                  <span className="mr-1 text-zinc-600">
                    @
                  </span>

                  {user.username}
                </div>
              </div>

              {/* Email */}
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-600">
                  Email
                </p>

                <div className="mt-2 rounded-lg border border-zinc-800 bg-black px-4 py-3 text-sm text-zinc-300">
                  {user.email}
                </div>
              </div>

            </div>
          </div>

          {/* Security */}
          <div className="border-t border-zinc-800 p-6 sm:p-8">

            <h2 className="text-lg font-semibold">
              Security
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Manage your password and account security.
            </p>

            <button
              onClick={() => navigate("/forgot-password")}
              className="mt-5 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:border-zinc-600 hover:bg-zinc-800"
            >
              Change Password
            </button>

          </div>

          {/* Logout */}
          <div className="border-t border-zinc-800 p-6 sm:p-8">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h2 className="font-semibold">
                  Sign out
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  Sign out of your ResumeAI account.
                </p>
              </div>

              <button
                onClick={handleLogout}
                disabled={logoutLoading}
                className="rounded-lg border border-red-900/50 px-5 py-2.5 text-sm font-medium text-red-400 transition hover:border-red-800 hover:bg-red-950/30 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {logoutLoading
                  ? "Signing out..."
                  : "Logout"}
              </button>

            </div>
          </div>

        </div>

        {/* Back to Dashboard */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-zinc-500 transition hover:text-white"
          >
            ← Back to HomePage
          </button>
        </div>

      </div>
    </div>
  );
}

export default Profile;
