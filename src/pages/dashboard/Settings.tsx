import { useState } from "react";
import {
  Bell,
  Shield,
  Key,
  User,
  Building2,
  CreditCard as CreditCardIcon,
  Smartphone,
  CheckCircle2,
  Settings as SettingsIcon,
} from "lucide-react";

function Settings() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div>
        <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-bold text-black mb-1">
          Settings
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Manage your account settings, team members, and preferences.
        </p>
      </div>

      {/* Settings Layout */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Navigation */}
        <nav className="flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 md:w-64 shrink-0 no-scrollbar">
          {[
            { id: "general", label: "General", icon: User },
            { id: "business", label: "Business Profile", icon: Building2 },
            { id: "billing", label: "Billing Plans", icon: CreditCardIcon },
            { id: "security", label: "Security", icon: Shield },
            { id: "apikeys", label: "API Keys", icon: Key },
            { id: "notifications", label: "Notifications", icon: Bell },
          ].map((tab) => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer
                    ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-700"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }
                  `}
              >
                <TabIcon
                  className={`w-4 h-4 ${activeTab === tab.id ? "text-blue-600" : "text-slate-400"}`}
                />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Settings Content Area */}
        <div className="flex-1 space-y-6">
          {/* Mock General Tab Content */}
          {activeTab === "general" && (
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Personal Information
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Update your photo and personal details.
                  </p>
                </div>

                <div className="p-6 space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl font-semibold shadow-md shrink-0">
                      JD
                    </div>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm cursor-pointer">
                        Change
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-red-600 transition-colors cursor-pointer">
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Jane"
                        className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 text-slate-900 transition-colors sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Doe"
                        className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 text-slate-900 transition-colors sm:text-sm"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue="jane@company.com"
                        className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 text-slate-900 transition-colors sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
                  <button className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20 text-sm cursor-pointer">
                    Save changes
                  </button>
                </div>
              </div>

              {/* Linked Devices */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Active Sessions
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage devices logged into your account.
                  </p>
                </div>
                <div className="divide-y divide-slate-100">
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                        <Smartphone className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-slate-900">
                            MacBook Pro - Chrome
                          </p>
                          <span className="flex items-center gap-1 text-[10px] font-semibold tracking-wide text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">
                            <CheckCircle2 className="w-3 h-3" /> Current
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          San Francisco, CA • Active now
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Empty State for other tabs */}
          {activeTab !== "general" &&
            activeTab !== "apikeys" &&
            activeTab !== "notifications" && (
              <div className="h-64 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center p-6 bg-slate-50/50">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                  <SettingsIcon className="w-6 h-6 text-slate-400" />
                </div>
                <h3 className="text-base font-semibold text-slate-900 mb-1 capitalize">
                  {activeTab} Settings
                </h3>
                <p className="text-sm text-slate-500 max-w-sm">
                  These configuration options would be connected to the backend
                  API via your data provider.
                </p>
              </div>
            )}

          {/* API Keys Tab (Provider Integration Status MVP) */}
          {activeTab === "apikeys" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Provider Integrations
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage connection status and API keys for supported
                    providers.
                  </p>
                </div>
                <div className="divide-y divide-slate-100">
                  {/* Paystack Integration */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-200 shrink-0">
                          <Key className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">
                            Paystack
                          </h4>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            <span className="text-xs font-medium text-emerald-700">
                              Connected
                            </span>
                          </div>
                        </div>
                      </div>
                      <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm cursor-pointer cursor-not-allowed opacity-60">
                        Managed by Backend
                      </button>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                          Secret Key
                        </span>
                        <code className="text-sm text-slate-700 font-mono">
                          sk_live_•••••••••••••••••••••8a4b
                        </code>
                      </div>
                    </div>
                  </div>

                  {/* Flutterwave Integration */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-200 shrink-0">
                          <Key className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">
                            Flutterwave
                          </h4>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                            <span className="text-xs font-medium text-slate-500">
                              Not Connected
                            </span>
                          </div>
                        </div>
                      </div>
                      <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm cursor-pointer cursor-not-allowed opacity-60">
                        Managed by Backend
                      </button>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">
                          Secret Key
                        </span>
                        <code className="text-sm text-slate-400 font-mono">
                          Not configured
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab (Basic Alert Toggle MVP) */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-200">
                  <h3 className="text-sm font-semibold text-slate-900">
                    Alert Preferences
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Configure automated notifications for provider degradation.
                  </p>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center shrink-0">
                        <Bell className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          Success Rate Alerts
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Receive an email if a provider's success rate falls
                          below the threshold.
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center gap-4">
                    <label className="text-sm font-medium text-slate-700 whitespace-nowrap">
                      Alert Threshold (%)
                    </label>
                    <div className="relative w-32">
                      <input
                        type="number"
                        defaultValue="85"
                        min="0"
                        max="100"
                        className="w-full pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm text-slate-900 outline-none transition-colors"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">
                        %
                      </span>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
                  <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20 text-sm cursor-pointer">
                    Save configuration
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
