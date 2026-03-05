import {
  Bell,
  Building2,
  CreditCard as CreditCardIcon,
  FileText,
  Key,
  Plus,
  Settings as SettingsIcon,
  Shield,
  Trash2,
  User,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/api";

type ApiKeyConfig = {
  provider: string;
  testPublicKey: string;
  testSecretKey: string;
  livePublicKey: string;
  liveSecretKey: string;
};

const AVAILABLE_PROVIDERS = ["Paystack", "Flutterwave"];

function Settings() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("general");
  const [apiKeys, setApiKeys] = useState<ApiKeyConfig[]>([]);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null);
  const [newKey, setNewKey] = useState<ApiKeyConfig>({
    provider: "Paystack",
    testPublicKey: "",
    testSecretKey: "",
    livePublicKey: "",
    liveSecretKey: "",
  });

  const { data: settingsResponse, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const token = localStorage.getItem("authToken");
      const response = await api.get("/accounts/user/details/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("=== SETTINGS RAW RESPONSE ===", response.data);
      return response.data;
    },
  });

  const settingsRaw = settingsResponse?.data || settingsResponse || {};
  const settingsData = settingsRaw?.user || settingsRaw;

  console.log("=== SETTINGS DATA ===", settingsData);
  console.log("=== PROFILE ===", settingsData?.profile);

  const firstName =
    settingsData?.profile?.first_name || settingsData?.first_name || "";
  const lastName =
    settingsData?.profile?.last_name || settingsData?.last_name || "";
  const emailAddress =
    settingsData?.profile?.email || settingsData?.email || "";

  useEffect(() => {
    // Navigate directly to data > merchants > api_clients
    const data = settingsResponse?.data || settingsResponse;
    const merchants = data?.merchants;
    const merchant = Array.isArray(merchants) ? merchants[0] : merchants;
    const clients = merchant?.api_clients || [];

    if (clients && Array.isArray(clients) && clients.length > 0) {
      const providerMap = new Map<string, ApiKeyConfig>();

      clients.forEach((client: any) => {
        const isTest =
          client.environment?.toLowerCase() === "sandbox" ||
          client.environment?.toLowerCase() === "test";
        const providers = client.providers || [];

        providers.forEach((p: any) => {
          if (!p || !p.provider) return;
          const providerName =
            p.provider.charAt(0).toUpperCase() +
            p.provider.slice(1).toLowerCase();

          if (!providerMap.has(providerName)) {
            providerMap.set(providerName, {
              provider: providerName,
              testPublicKey: "",
              testSecretKey: "",
              livePublicKey: "",
              liveSecretKey: "",
            });
          }

          const config = providerMap.get(providerName)!;
          // Set to masked dots if provider exists, showing it's configured.
          if (isTest) {
            config.testPublicKey = "••••••••••••••••";
            config.testSecretKey = "••••••••••••••••";
          } else {
            config.livePublicKey = "••••••••••••••••";
            config.liveSecretKey = "••••••••••••••••";
          }
        });
      });

      setApiKeys(Array.from(providerMap.values()));
    }
  }, [settingsResponse]);

  const { mutateAsync: setupProvider, isPending: isSettingUpProvider } =
    useMutation({
      mutationFn: async (payload: any) => {
        const token = localStorage.getItem("authToken");
        const response = await api.post(
          "/api/client-provider/setup/",
          payload,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        return response.data;
      },
    });

  const handleAddKey = async () => {
    const merchants = settingsRaw?.merchants;
    const merchantId =
      (Array.isArray(merchants)
        ? merchants[0]?.merchant_id
        : merchants?.merchant_id) ||
      settingsData?.merchant_id ||
      "165714267";
    try {
      if (newKey.testPublicKey || newKey.testSecretKey) {
        await setupProvider({
          merchant_id: merchantId.toString(),
          environment: "sandbox",
          provider: newKey.provider.toLowerCase(),
          credential_type: "api_key",
          credentials: {
            public_key: newKey.testPublicKey || "",
            secret_key: newKey.testSecretKey || "",
          },
        });
      }

      if (newKey.livePublicKey || newKey.liveSecretKey) {
        await setupProvider({
          merchant_id: merchantId.toString(),
          environment: "live",
          provider: newKey.provider.toLowerCase(),
          credential_type: "api_key",
          credentials: {
            public_key: newKey.livePublicKey || "",
            secret_key: newKey.liveSecretKey || "",
          },
        });
      }

      await queryClient.invalidateQueries({ queryKey: ["settings"] });

      setIsApiKeyModalOpen(false);
      setNewKey({
        provider: "Paystack",
        testPublicKey: "",
        testSecretKey: "",
        livePublicKey: "",
        liveSecretKey: "",
      });
    } catch (error) {
      console.error("Failed to setup provider:", error);
    }
  };

  const handleDeleteKey = () => {
    if (keyToDelete) {
      setApiKeys((prev) => prev.filter((k) => k.provider !== keyToDelete));
      setKeyToDelete(null);
    }
  };

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
            { id: "apikeys", label: "Providers", icon: Key },
            { id: "kyc", label: "KYC Documents", icon: FileText },
            { id: "billing", label: "Billing Plans", icon: CreditCardIcon },
            { id: "security", label: "Security", icon: Shield },
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
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-8 h-8 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
            </div>
          ) : (
            <>
              {/* General Tab Content */}
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
                          {firstName?.[0]?.toUpperCase() || "U"}
                          {lastName?.[0]?.toUpperCase() || ""}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            First Name
                          </label>
                          <input
                            type="text"
                            value={firstName}
                            readOnly
                            className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-slate-100 text-slate-500 cursor-not-allowed sm:text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Last Name
                          </label>
                          <input
                            type="text"
                            value={lastName}
                            readOnly
                            className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-slate-100 text-slate-500 cursor-not-allowed sm:text-sm"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={emailAddress}
                            readOnly
                            className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-slate-100 text-slate-500 cursor-not-allowed sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Empty State for other tabs */}
              {/* Business Profile Tab Content */}
              {activeTab === "business" && (
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-slate-200">
                      <h3 className="text-sm font-semibold text-slate-900">
                        Business Profile
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Update your business details and contact information.
                      </p>
                    </div>

                    <div className="p-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Business Name
                          </label>
                          <input
                            type="text"
                            defaultValue={settingsData.business_name || ""}
                            className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 text-slate-900 transition-colors sm:text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Business Email
                          </label>
                          <input
                            type="email"
                            defaultValue={settingsData.business_email || ""}
                            className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 text-slate-900 transition-colors sm:text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Business Phone
                          </label>
                          <input
                            type="tel"
                            defaultValue={settingsData.business_phone || ""}
                            className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 text-slate-900 transition-colors sm:text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Merchant Type
                          </label>
                          <select
                            defaultValue={
                              settingsData.merchant_type || "ecommerce"
                            }
                            className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 text-slate-900 transition-colors sm:text-sm appearance-none"
                          >
                            <option value="ecommerce">E-commerce</option>
                            <option value="saas">SaaS</option>
                            <option value="marketplace">Marketplace</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Website
                          </label>
                          <input
                            type="url"
                            defaultValue={settingsData.website || ""}
                            className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 text-slate-900 transition-colors sm:text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Registration Number
                          </label>
                          <input
                            type="text"
                            defaultValue={
                              settingsData.registration_number || ""
                            }
                            className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 text-slate-900 transition-colors sm:text-sm"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Address
                          </label>
                          <input
                            type="text"
                            defaultValue={settingsData.address || ""}
                            className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 text-slate-900 transition-colors sm:text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Country
                          </label>
                          <input
                            type="text"
                            defaultValue={settingsData.country || ""}
                            className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 text-slate-900 transition-colors sm:text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            State/Province
                          </label>
                          <input
                            type="text"
                            defaultValue={
                              settingsData.state ||
                              settingsData.state_province ||
                              ""
                            }
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
                </div>
              )}

              {/* KYC Documents Tab Content */}
              {activeTab === "kyc" && (
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-slate-200">
                      <h3 className="text-sm font-semibold text-slate-900">
                        KYC Documents
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Upload necessary documents to verify your business.
                      </p>
                    </div>

                    <div className="p-6">
                      <div className="space-y-6 max-w-lg">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Document Type
                          </label>
                          <select className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 text-slate-900 transition-colors sm:text-sm appearance-none">
                            <option value="incorporation">
                              Certificate of Incorporation
                            </option>
                            <option value="memorandum">
                              Memorandum of Association
                            </option>
                            <option value="id_card">Director's ID Card</option>
                            <option value="utility_bill">Utility Bill</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Upload Document
                          </label>
                          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                            <div className="space-y-1 text-center">
                              <FileText className="mx-auto h-12 w-12 text-slate-300" />
                              <div className="flex text-sm text-slate-600 justify-center mt-4">
                                <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                  <span>Upload a file</span>
                                  <input type="file" className="sr-only" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-slate-500 mt-1">
                                PNG, JPG, PDF up to 10MB
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
                      <button className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20 text-sm cursor-pointer">
                        Upload Document
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Empty State for other tabs */}
              {activeTab !== "general" &&
                activeTab !== "business" &&
                activeTab !== "kyc" &&
                activeTab !== "apikeys" && (
                  <div className="h-64 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center p-6 bg-slate-50/50">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                      <SettingsIcon className="w-6 h-6 text-slate-400" />
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 mb-1 capitalize">
                      {activeTab} Settings
                    </h3>
                    <p className="text-sm text-slate-500 max-w-sm">
                      {activeTab === "billing" ||
                      activeTab === "security" ||
                      activeTab === "notifications"
                        ? "We are currently building out this module. Check back later for updates!"
                        : "These configuration options would be connected to the backend API via your data provider."}
                    </p>
                    {(activeTab === "billing" ||
                      activeTab === "security" ||
                      activeTab === "notifications") && (
                      <span className="mt-4 px-3 py-1 bg-blue-50 text-blue-600 border border-blue-200 text-xs font-semibold rounded-full uppercase tracking-wider">
                        Coming Soon
                      </span>
                    )}
                  </div>
                )}

              {/* API Keys Tab (Provider Integration Status MVP) */}
              {activeTab === "apikeys" && (
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-900">
                          Provider Integrations
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          Manage connection status and API keys for supported
                          providers.
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setNewKey({
                            provider: AVAILABLE_PROVIDERS[0],
                            testPublicKey: "",
                            testSecretKey: "",
                            livePublicKey: "",
                            liveSecretKey: "",
                          });
                          setIsApiKeyModalOpen(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 font-medium rounded-lg transition-colors shadow-sm text-sm bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" /> Add Key
                      </button>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {apiKeys.length === 0 ? (
                        <div className="p-12 text-center text-slate-500 flex flex-col items-center">
                          <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                            <Key className="w-6 h-6 text-slate-400" />
                          </div>
                          <p className="font-medium text-slate-900 mb-1">
                            No providers configured
                          </p>
                          <p className="text-sm">
                            Click the Add Key button to integrate a new
                            provider.
                          </p>
                        </div>
                      ) : (
                        apiKeys.map((config, index) => (
                          <div key={index} className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-200 shrink-0">
                                  <Key className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-slate-900">
                                    {config.provider}
                                  </h4>
                                  <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                    <span className="text-xs font-medium text-emerald-700">
                                      Connected
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                {/* Delete Button */}
                                <button
                                  onClick={() =>
                                    setKeyToDelete(config.provider)
                                  }
                                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                  title="Delete Provider"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col justify-center gap-3">
                                <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
                                  Sandbox Environment
                                </span>
                                <div>
                                  {config.testPublicKey ||
                                  config.testSecretKey ? (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
                                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                      Active
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-200 text-slate-600 text-xs font-medium">
                                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                                      Not Configured
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col justify-center gap-3">
                                <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">
                                  Live Environment
                                </span>
                                <div>
                                  {config.livePublicKey ||
                                  config.liveSecretKey ? (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                      Active
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-200 text-slate-600 text-xs font-medium">
                                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                                      Not Configured
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* API Key Modal */}
      {isApiKeyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-xl animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">
                Add API Key Configuration
              </h3>
              <button
                onClick={() => setIsApiKeyModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Provider
                </label>
                <select
                  value={newKey.provider}
                  onChange={(e) =>
                    setNewKey({ ...newKey, provider: e.target.value })
                  }
                  className="block w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 text-slate-900 transition-colors sm:text-sm appearance-none"
                >
                  {AVAILABLE_PROVIDERS.map((provider) => (
                    <option key={provider} value={provider}>
                      {provider}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sandbox Environment Details */}
              <div className="space-y-4 p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>{" "}
                  Sandbox Environment
                </h4>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Public Key
                  </label>
                  <input
                    type="text"
                    value={newKey.testPublicKey}
                    onChange={(e) =>
                      setNewKey({ ...newKey, testPublicKey: e.target.value })
                    }
                    placeholder="pk_test_..."
                    className="block w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white text-slate-900 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Secret Key
                  </label>
                  <input
                    type="text"
                    value={newKey.testSecretKey}
                    onChange={(e) =>
                      setNewKey({ ...newKey, testSecretKey: e.target.value })
                    }
                    placeholder="sk_test_..."
                    className="block w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white text-slate-900 sm:text-sm"
                  />
                </div>
              </div>

              {/* Live Environment Details */}
              <div className="space-y-4 p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>{" "}
                  Live Environment
                </h4>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Public Key
                  </label>
                  <input
                    type="text"
                    value={newKey.livePublicKey}
                    onChange={(e) =>
                      setNewKey({ ...newKey, livePublicKey: e.target.value })
                    }
                    placeholder="pk_live_..."
                    className="block w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white text-slate-900 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Secret Key
                  </label>
                  <input
                    type="password"
                    value={newKey.liveSecretKey}
                    onChange={(e) =>
                      setNewKey({ ...newKey, liveSecretKey: e.target.value })
                    }
                    placeholder="sk_live_..."
                    className="block w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white text-slate-900 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
              <button
                onClick={() => setIsApiKeyModalOpen(false)}
                className="px-4 py-2 font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleAddKey}
                disabled={
                  (!newKey.testPublicKey &&
                    !newKey.testSecretKey &&
                    !newKey.livePublicKey &&
                    !newKey.liveSecretKey) ||
                  isSettingUpProvider
                }
                className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm shadow-blue-500/20 text-sm flex items-center gap-2"
              >
                {isSettingUpProvider ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
                    Saving...
                  </>
                ) : (
                  "Save Integration"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {keyToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-xl animate-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">
                Remove Integration
              </h3>
              <p className="text-sm text-slate-500 mb-6">
                Are you sure you want to remove the{" "}
                <span className="font-semibold">{keyToDelete}</span>{" "}
                integration? You can re-add it later.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setKeyToDelete(null)}
                  className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors cursor-pointer text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteKey}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-sm shadow-red-500/20 transition-colors cursor-pointer text-sm"
                >
                  Remove Key
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
