import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./pages/auth/AuthLayout";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Login from "./pages/auth/Login";
import ResetPassword from "./pages/auth/ResetPassword";
import Signup from "./pages/auth/Signup";
import VerifyCode from "./pages/auth/VerifyCode";
import Dashboard from "./pages/Dashboard";
import DocsPage from "./pages/DocsPage";
import Logs from "./pages/dashboard/Logs";
import Overview from "./pages/dashboard/Overview";
import Providers from "./pages/dashboard/Providers";
import Settings from "./pages/dashboard/Settings";
import Transactions from "./pages/dashboard/Transactions";
import Authentication from "./pages/docs/Authentication";
import Installation from "./pages/docs/Installation";
import Introduction from "./pages/docs/Introduction";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Overview />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="providers" element={<Providers />} />
          <Route path="logs" element={<Logs />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="/docs" element={<DocsPage />}>
          <Route index element={<Introduction />} />
          <Route
            path="introduction"
            element={<Navigate to="/docs" replace />}
          />
          <Route path="installation" element={<Installation />} />
          <Route path="authentication" element={<Authentication />} />
        </Route>

        <Route path="/auth" element={<AuthLayout />}>
          <Route index element={<Navigate to="login" replace />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="verify" element={<VerifyCode />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
