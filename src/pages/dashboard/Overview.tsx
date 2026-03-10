import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Server,
  TrendingDown,
  TrendingUp,
  XCircle,
  Loader2,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/api";
import { Link, useNavigate } from "react-router-dom";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chartData = [
  { time: "00:00", rate: 94 },
  { time: "04:00", rate: 96 },
  { time: "08:00", rate: 95 },
  { time: "12:00", rate: 92 },
  { time: "16:00", rate: 97 },
  { time: "20:00", rate: 98 },
  { time: "24:00", rate: 96 },
];

function Overview() {
  console.log("🔥 Overview component rerendered! Checking logs...");
  const navigate = useNavigate();

  const { data: overviewResponse, isLoading, error, isError } = useQuery({
    queryKey: ["overview"],
    queryFn: async () => {
      const token = localStorage.getItem("authToken");
      const response = await api.get(`/analytics/overview/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
  });

  console.log("Raw API Response (overviewResponse):", overviewResponse);

  const overviewData = overviewResponse?.data || overviewResponse || {
    transactions: {
      total_transactions: 0,
      successful_transactions: 0,
      failed_transactions: 0,
      success_rate: "0%",
      total_value: 0
    },
    provider_performance: [],
    provider_success_graph: []
  };

  const { transactions, provider_performance, provider_success_graph } = overviewData;
  const displayedChartData = provider_success_graph?.length ? provider_success_graph : chartData;

  console.log("Raw API Response (overviewResponse):", overviewResponse);
  console.log("Extracted overviewData:", overviewData);
  console.log("Extracted provider_performance:", provider_performance);
  if (isError) {
    console.error("API Error fetching overview:", error);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12 h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-bold text-black mb-1">
            Overview Snapshot
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Quick health snapshot of your payment operations.
          </p>
        </div>
      </div>

      {/* Metric Cards (Top Row) */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          {
            label: "Total Transactions",
            value: transactions.total_transactions?.toLocaleString() || "0",
            trend: "+0%",
            color: "text-emerald-600",
            up: true,
          },
          {
            label: "Successful tx",
            value: transactions.successful_transactions?.toLocaleString() || "0",
            trend: "+0%",
            color: "text-emerald-600",
            up: true,
          },
          {
            label: "Failed tx",
            value: transactions.failed_transactions?.toLocaleString() || "0",
            trend: "-0%",
            color: "text-emerald-600",
            up: false,
          },
          {
            label: "Success Rate",
            value: transactions.success_rate || "0%",
            trend: "+0%",
            color: "text-blue-600",
            up: true,
          },
          {
            label: "Total Value",
            value: `₦${transactions.total_value?.toLocaleString() || "0"}`,
            trend: "+0%",
            color: "text-emerald-600",
            up: true,
          },
        ].map((stat, i) => (
          <div
            key={i}
            onClick={() => navigate("/dashboard/transactions")}
            className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between cursor-pointer hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <span className="text-xs font-medium text-slate-500 mb-3 block">
              {stat.label}
            </span>
            <div className="flex items-end justify-between">
              <span className="font-['Outfit'] text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {stat.value}
              </span>
              <div
                className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-full ${stat.color} bg-slate-50`}
              >
                {stat.up ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {stat.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Success Rate Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 flex flex-col h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" /> Success Rate Trend
            </h3>
          </div>
          <div className="flex-1 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={displayedChartData}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  domain={[80, 100]}
                  dx={-10}
                  tickFormatter={(val) => `${val}%`}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    boxShadow:
                      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{
                    r: 6,
                    fill: "#2563eb",
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Provider Performance Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-fit flex flex-col">
          <div className="px-5 sm:px-6 py-4 border-b border-slate-200 flex items-center justify-between shrink-0">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2">
              <Server className="w-5 h-5 text-blue-500" /> Provider Performance
            </h3>
          </div>
          <div className="divide-y divide-slate-100 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500 rounded-t-lg">
                <tr>
                  <th className="px-4 py-3 font-medium">Provider</th>
                  <th className="px-4 py-3 font-medium text-right">Total TX</th>
                  <th className="px-4 py-3 font-medium text-right">SR %</th>
                  <th className="px-4 py-3 font-medium text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {provider_performance?.length > 0 ? provider_performance.map((provider: any, idx: number) => {
                  const name = provider.provider || provider.provider_name || provider.name || "Unknown";
                  const tx = provider.total_transactions ?? provider.tx ?? 0;
                  const sr = provider.success_rate || provider.rate || "-";
                  const status = (provider.status || "good").toLowerCase();

                  let statusTextColor = "text-emerald-600";
                  let StatusIcon = CheckCircle2;

                  if (status === "poor") {
                    statusTextColor = "text-red-500";
                    StatusIcon = XCircle;
                  } else if (status === "average") {
                    statusTextColor = "text-amber-500";
                    StatusIcon = Clock;
                  }

                  return (
                    <tr
                      key={idx}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-4 py-3 font-medium text-slate-900 capitalize">
                        {name}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-600">
                        {tx.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-slate-900">
                        {sr}
                      </td>
                      <td className="px-4 py-3 pb-3 text-center flex justify-center mt-1">
                        <div className={`inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider ${statusTextColor}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {status}
                        </div>
                      </td>
                    </tr>
                  );
                }) : (
                  <tr>
                    <td colSpan={4} className="px-4 py-8 text-center text-slate-500 text-sm">
                      No provider data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="bg-slate-50 border-t border-slate-200 p-3 text-center">
            <Link
              to="/dashboard/providers"
              className="text-xs font-medium text-blue-600 hover:text-blue-700 inline-flex items-center transition-colors cursor-pointer group"
            >
              View detailed routing metrics
              <ArrowUpRight className="w-3 h-3 ml-1 text-blue-400 group-hover:text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
