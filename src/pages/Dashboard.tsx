import {
  Activity,
  Bell,
  Building2,
  Code2,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  ShieldCheck,
  Terminal,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, userName } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeEnvironment, setActiveEnvironment] = useState<"test" | "live">(
    "live",
  );

  const isActive = (path: string) => {
    return (
      location.pathname === path ||
      (path === "/dashboard" && location.pathname === "/dashboard")
    );
  };

  const getInitials = (name: string) => {
    if (!name) return "UU";
    const parts = name.trim().split(" ").filter(Boolean);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500/30 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out flex flex-col
        lg:translate-x-0 lg:static lg:w-64
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/20">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-['Outfit'] font-bold text-xl tracking-tight text-black">
              PayFlow
            </span>
          </Link>
          <button
            className="ml-auto lg:hidden text-slate-500 hover:text-slate-900"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4">
          {/* Primary Nav */}
          <nav className="space-y-1 mb-8">
            <Link
              to="/dashboard"
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 ${isActive("/dashboard") ? "bg-slate-100 text-blue-600 font-medium" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"} rounded-lg transition-colors cursor-pointer`}
            >
              <LayoutDashboard className="w-5 h-5" /> Overview
            </Link>
            <Link
              to="/dashboard/transactions"
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 ${isActive("/dashboard/transactions") ? "bg-slate-100 text-blue-600 font-medium" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"} rounded-lg transition-colors cursor-pointer`}
            >
              <Activity className="w-5 h-5" /> Transactions
            </Link>
            <Link
              to="/dashboard/providers"
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 ${isActive("/dashboard/providers") ? "bg-slate-100 text-blue-600 font-medium" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"} rounded-lg transition-colors cursor-pointer`}
            >
              <Building2 className="w-5 h-5" /> Providers
            </Link>
            <Link
              to="/dashboard/logs"
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 ${isActive("/dashboard/logs") ? "bg-slate-100 text-blue-600 font-medium" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"} rounded-lg transition-colors cursor-pointer`}
            >
              <Terminal className="w-5 h-5" /> Logs
            </Link>
          </nav>

          {/* Secondary Nav */}
          <div className="mb-4">
            <h4 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Developers
            </h4>
            <nav className="space-y-1">
              <Link
                to="/docs"
                className="flex items-center gap-3 px-3 py-2 text-slate-600 font-medium rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <Code2 className="w-5 h-5 text-slate-400" /> Documentation
              </Link>
              <Link
                to="/dashboard/api-keys"
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 ${isActive("/dashboard/api-keys") ? "bg-slate-100 text-blue-600 font-medium" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"} rounded-lg transition-colors cursor-pointer`}
              >
                <ShieldCheck
                  className={`w-5 h-5 ${isActive("/dashboard/api-keys") ? "text-blue-600" : "text-slate-400"}`}
                />{" "}
                My API Key
              </Link>
            </nav>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100">
          <nav className="space-y-1">
            <Link
              to="/dashboard/settings"
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 ${isActive("/dashboard/settings") ? "bg-slate-100 text-blue-600 font-medium" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"} rounded-lg transition-colors cursor-pointer`}
            >
              <Settings className="w-5 h-5 text-slate-400" /> Settings
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 font-medium rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
            >
              <LogOut className="w-5 h-5" /> Sign Out
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10 shrink-0">
          <button
            className="lg:hidden text-slate-500 hover:text-slate-900 mr-4"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Environment Toggle and Profile */}
          <div className="ml-auto flex items-center gap-4 sm:gap-6">
            <div className="hidden sm:flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
              <span
                className={`text-xs font-semibold transition-colors ${activeEnvironment === "test"
                    ? "text-amber-600"
                    : "text-slate-400"
                  }`}
              >
                Test
              </span>
              <button
                onClick={() =>
                  setActiveEnvironment(
                    activeEnvironment === "live" ? "test" : "live",
                  )
                }
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${activeEnvironment === "live"
                    ? "bg-emerald-500"
                    : "bg-amber-500"
                  }`}
              >
                <span className="sr-only">Toggle environment</span>
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${activeEnvironment === "live"
                      ? "translate-x-6" // 24px (24 + 16 = 40. 44 - 40 = 4px margin right)
                      : "translate-x-1" // 4px margin left
                    }`}
                />
              </button>
              <span
                className={`text-xs font-semibold transition-colors ${activeEnvironment === "live"
                    ? "text-emerald-600"
                    : "text-slate-400"
                  }`}
              >
                Live
              </span>
            </div>

            <button className="text-slate-400 hover:text-slate-600 transition-colors relative cursor-pointer">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-blue-600 rounded-full border border-white"></span>
            </button>

            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-sm font-semibold cursor-pointer shadow-sm">
              {getInitials(userName)}
            </div>
          </div>
        </header>

        {/* Dashboard Scrollable Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
