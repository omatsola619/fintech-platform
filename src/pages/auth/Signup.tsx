import { ArrowRight, Briefcase, Lock, Mail, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/auth/verify");
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10 text-center">
        <h1 className="font-['Outfit'] text-3xl font-bold mb-3 text-black">
          Create your account
        </h1>
        <p className="text-slate-600">
          Start integrating payment providers in minutes
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              First Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                required
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 text-slate-900 transition-colors"
                placeholder="Jane"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Last Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                required
                className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 text-slate-900 transition-colors"
                placeholder="Doe"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Business Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Briefcase className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              required
              className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 text-slate-900 transition-colors"
              placeholder="Acme Corp"
            />
          </div>
        </div>

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
              className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 text-slate-900 transition-colors"
              placeholder="jane@company.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="password"
              required
              className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 text-slate-900 transition-colors"
              placeholder="••••••••"
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Must be at least 8 characters long.
          </p>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm shadow-black/10 text-sm font-semibold text-white bg-black hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-colors group cursor-pointer"
        >
          Create Account
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>

      <div className="mt-10 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="font-semibold text-blue-600 hover:text-blue-500 cursor-pointer"
        >
          Sign in instead
        </Link>
      </div>
    </div>
  );
}

export default Signup;
