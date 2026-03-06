import { CheckCircle2, Copy, Eye, EyeOff, Key, Shield, ShieldAlert, Loader2 } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";

function MyApiKey() {
  const [showLiveSecret, setShowLiveSecret] = useState(false);
  const [showTestSecret, setShowTestSecret] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const { data: settingsResponse, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const token = localStorage.getItem("authToken");
      const response = await api.get("/accounts/user/details/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });

  const settingsRaw = settingsResponse?.data || settingsResponse || {};
  const merchantsData = settingsRaw?.merchants;
  const merchant = Array.isArray(merchantsData) ? merchantsData[0] : merchantsData;
  const apiClients = merchant?.api_clients || [];

  const liveClient = apiClients.find(
    (c: any) => c.environment?.toLowerCase() === "live"
  );
  const testClient = apiClients.find(
    (c: any) =>
      c.environment?.toLowerCase() === "sandbox" ||
      c.environment?.toLowerCase() === "test"
  );

  const apiKeys = {
    livePublicKey: liveClient?.client_public_key || "",
    liveSecretKey: liveClient?.client_secret_key || "",
    testPublicKey: testClient?.client_public_key || "",
    testSecretKey: testClient?.client_secret_key || "",
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const renderKeyField = (
    label: string,
    value: string,
    id: string,
    isSecret: boolean,
    showSecret: boolean,
    toggleSecret?: () => void
  ) => {
    const isCopied = copiedKey === id;

    return (
      <div className="mb-6 last:mb-0">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {label}
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type={isSecret && !showSecret ? "password" : "text"}
              value={value || ""}
              readOnly
              className="block w-full pl-4 pr-12 py-3 border border-slate-200 rounded-xl bg-slate-50 font-mono text-sm text-slate-800 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
            {isSecret && toggleSecret && (
              <button
                type="button"
                onClick={toggleSecret}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg transition-colors cursor-pointer"
                title={showSecret ? "Hide key" : "Show key"}
              >
                {showSecret ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            )}
          </div>

          <button
            onClick={() => copyToClipboard(value, id)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-all active:scale-[0.98] sm:w-auto w-full group cursor-pointer shadow-sm"
          >
            {isCopied ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-bold text-black mb-1">
          My API Keys
        </h1>
        <p className="text-slate-600 text-sm">
          Use these keys to authenticate your requests to the PayFlow API.
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-12 bg-white rounded-2xl border border-slate-200">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Live Mode Keys */}
          <div className="bg-white rounded-2xl border border-emerald-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-emerald-100 flex items-center gap-3 bg-emerald-50/50">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center border border-emerald-200 shrink-0">
                <Shield className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">Live Mode</h3>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wider">Active</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Keys for processing real transactions. Keep your secret key safe.
                </p>
              </div>
            </div>
            <div className="p-6 flex-1">
              {renderKeyField("Public Key", apiKeys.livePublicKey, "live_public", false, true)}
              {renderKeyField("Secret Key", apiKeys.liveSecretKey, "live_secret", true, showLiveSecret, () => setShowLiveSecret(!showLiveSecret))}
            </div>
          </div>

          {/* Test Mode Keys */}
          <div className="bg-white rounded-2xl border border-amber-200 shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-amber-100 flex items-center gap-3 bg-amber-50/50">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center border border-amber-200 shrink-0">
                <ShieldAlert className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">Test Mode</h3>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-wider">Sandbox</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Keys for testing your integration. No real money is moved.
                </p>
              </div>
            </div>
            <div className="p-6 flex-1">
              {renderKeyField("Public Key", apiKeys.testPublicKey, "test_public", false, true)}
              {renderKeyField("Secret Key", apiKeys.testSecretKey, "test_secret", true, showTestSecret, () => setShowTestSecret(!showTestSecret))}
            </div>
          </div>
        </div>
      )}

      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
          <Key className="w-5 h-5 text-slate-600" />
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 mb-1">Key Security Principles</h4>
          <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
            <li>Never share your secret keys in publicly accessible areas (GitHub, client-side code).</li>
            <li>Your public keys can be safely used in front-end applications or mobile apps.</li>
            <li>If you suspect your secret key has been compromised, you should roll it immediately.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MyApiKey;
