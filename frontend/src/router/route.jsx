import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";

import MainLayout from "../layout/MainLayout";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Analyze from "../pages/Analyze";
import Profile from "../pages/Profile";
import ResetPassword from "../pages/ResetPassword";
import ForgotPassword from "../pages/ForgotPassword";
import Results from "../pages/Results";
import MyResumes from "../pages/MyResumes";
import ProtectedRoute from "../../utils/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>

      {/* Public/Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        
        <Route path="/" element={<MainLayout />}>
          
          <Route index element={<Dashboard />} />

          <Route path="analyze" element={<Analyze />} />

          <Route
            path="analyze/:resumeId/results"
            element={<Results />}
          />

          <Route
            path="my-resumes"
            element={<MyResumes />}
          />

          <Route
            path="profile"
            element={<Profile />}
          />

        </Route>

      </Route>

    </Route>
  )
);

export default router;

