import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send reset email here.
    // For flow purposes, navigate to verify code.
    navigate("/auth/verify", { state: { purpose: "reset", email } });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-slate-900">
      <Link
        to="/auth/login"
        className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors mb-8 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to log in
      </Link>

      <div className="mb-10">
        <h1 className="font-['Outfit'] text-3xl font-bold mb-3 text-black">
          Reset password
        </h1>
        <p className="text-slate-600">
          Enter the email associated with your account and we'll send you a
          6-digit verification code.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 text-slate-900 transition-colors"
              placeholder="you@company.com"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm shadow-blue-500/30 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors group cursor-pointer"
        >
          Send reset code
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
