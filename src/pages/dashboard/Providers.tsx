import {
  Activity,
  Clock,
  HelpCircle,
  Server,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

const PROVIDERS_DATA = [
  {
    id: 1,
    name: "Paystack",
    connected: true,
    lastSync: "just now",
    txWeek: "12,500",
    rateWeek: 94.2,
    latency: "245ms",
    degradation: false,
  },
  {
    id: 2,
    name: "Flutterwave",
    connected: true,
    lastSync: "2m ago",
    txWeek: "6,200",
    rateWeek: 87.5,
    latency: "850ms",
    degradation: true,
  },
  {
    id: 3,
    name: "Stripe",
    connected: false,
    lastSync: "Never",
    txWeek: "0",
    rateWeek: 0,
    latency: "-",
    degradation: false,
  },
];

function Providers() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-bold text-black mb-1">
            Providers Health
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Monitor integration status and real-time performance.
          </p>
        </div>
      </div>

      {/* Provider Cards Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROVIDERS_DATA.map((provider) => (
          <div
            key={provider.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col hover:shadow-md transition-shadow"
          >
            {/* Card Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-200 shrink-0">
                  <Server className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {provider.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {provider.connected ? (
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                    )}
                    <span className="text-xs text-slate-500 font-medium">
                      {provider.connected ? "Connected" : "Not Connected"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Body Metrics */}
            <div className="p-5 space-y-5 flex-1 bg-slate-50/50">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-1 flex items-center gap-1">
                    Success Rate (7d) <HelpCircle className="w-3 h-3" />
                  </p>
                  <p className="font-['Outfit'] text-xl font-bold text-slate-900 flex items-baseline gap-2">
                    {provider.rateWeek > 0 ? `${provider.rateWeek}%` : "-"}
                    {provider.rateWeek > 90 && (
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                    )}
                    {provider.rateWeek > 0 && provider.rateWeek <= 90 && (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-1">
                    Total TX (7d)
                  </p>
                  <p className="font-['Outfit'] text-xl font-bold text-slate-900">
                    {provider.txWeek}
                  </p>
                </div>
              </div>

              <div className="bg-white border text-left flex-1 p-3 rounded-xl border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900 text-sm">
                    Avg Latency
                  </p>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {provider.latency}
                  </p>
                </div>
                {provider.degradation ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider text-amber-700 bg-amber-100 px-2 py-1 rounded uppercase">
                    Degraded
                  </span>
                ) : (
                  provider.connected && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider text-emerald-700 bg-emerald-100 px-2 py-1 rounded uppercase">
                      Healthy
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-4 border-t border-slate-100 bg-white rounded-b-2xl flex items-center justify-between">
              <span className="text-xs text-slate-500 flex items-center gap-2">
                <Activity className="w-3 h-3 text-blue-500" /> Last sync:{" "}
                {provider.lastSync}
              </span>
              <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">
                View Logs
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Providers;
