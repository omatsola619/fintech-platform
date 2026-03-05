import { CheckCircle2, Copy, Eye, EyeOff, Key } from "lucide-react";
import { useState } from "react";

function MyApiKey() {
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);

  // Mock platform API key given to user
  const apiKey =
    "pk_live_8f3a2b4cd9e1r7t5y6u3i0o2p4a5s6d7f8g9h0j1k2l3z4x5c6v7b8n9m0";

  const toggleKey = () => setShowKey(!showKey);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-bold text-black mb-1">
          My API Key
        </h1>
        <p className="text-slate-600 text-sm">
          Use this key to authenticate your requests to the PayFlow API. Keep it
          secret.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 flex items-center gap-3 bg-slate-50/50">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100 shrink-0">
            <Key className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Live Secret Key
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              This key can perform any action on your account.
            </p>
          </div>
        </div>

        <div className="p-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Your API Key
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type={showKey ? "text" : "password"}
                value={apiKey}
                readOnly
                className="block w-full pl-4 pr-12 py-3 border border-slate-200 rounded-xl bg-slate-50 font-mono text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={toggleKey}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg transition-colors cursor-pointer"
                title={showKey ? "Hide key" : "Show key"}
              >
                {showKey ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            <button
              onClick={copyToClipboard}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all shadow-sm shadow-blue-500/20 active:scale-[0.98] sm:w-auto w-full group cursor-pointer"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                  <span>Copy Key</span>
                </>
              )}
            </button>
          </div>
          <div className="mt-5 p-4 bg-amber-50 rounded-xl border border-amber-200">
            <p className="text-xs text-amber-800 flex items-start gap-2">
              <span className="font-bold flex-shrink-0 mt-0.5 font-sans">
                ⚠️ Warning:
              </span>
              <span>
                Do not share your API key in publicly accessible areas such as
                GitHub, client-side code, and so forth. Anyone with this key can
                access your account.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyApiKey;
