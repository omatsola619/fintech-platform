import { useState } from "react";
import { Search, Database, Terminal, Copy, X } from "lucide-react";

const MOCK_LOGS = [
  {
    id: "1",
    time: "14:32:01.041",
    event: "Request Sent",
    provider: "Paystack",
    status: "Pending",
    ref: "tx_pay_90210a",
  },
  {
    id: "2",
    time: "14:32:01.282",
    event: "Response Received",
    provider: "Paystack",
    status: "Success",
    ref: "tx_pay_90210a",
  },
  {
    id: "3",
    time: "14:32:02.100",
    event: "Webhook Received",
    provider: "Paystack",
    status: "Success",
    ref: "tx_pay_90210a",
  },
  {
    id: "4",
    time: "14:30:10.111",
    event: "Request Sent",
    provider: "Flutterwave",
    status: "Pending",
    ref: "tx_flw_10293b",
  },
  {
    id: "5",
    time: "14:30:11.311",
    event: "Response Received",
    provider: "Flutterwave",
    status: "Failed",
    ref: "tx_flw_10293b",
  },
];

function Logs() {
  const [selectedLog, setSelectedLog] = useState<any>(null);

  return (
    <div className="max-w-6xl mx-auto flex flex-col h-[calc(100vh-6rem)] animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden relative">
      {/* Header & Search */}
      <div className="shrink-0 space-y-4 mb-6">
        <div>
          <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-bold text-black mb-1">
            Developer Logs
          </h1>
          <p className="text-slate-600 text-sm">
            Deep dive into provider requests, responses, and webhook events.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by transaction reference or Provider ID..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      {/* Main Logs Table Area */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col relative z-10 w-full mb-10">
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm text-left font-mono">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 sticky top-0 z-10 border-b border-slate-200 font-sans">
              <tr>
                <th className="px-6 py-4 font-medium">Timestamp</th>
                <th className="px-6 py-4 font-medium">Event Type</th>
                <th className="px-6 py-4 font-medium">Provider</th>
                <th className="px-6 py-4 font-medium">Ref</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-[13px]">
              {MOCK_LOGS.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-slate-50 transition-colors group"
                >
                  <td className="px-6 py-4 text-slate-500">{log.time}</td>
                  <td className="px-6 py-4 text-blue-600 font-medium">
                    {log.event}
                  </td>
                  <td className="px-6 py-4 text-slate-900 font-sans">
                    {log.provider}
                  </td>
                  <td className="px-6 py-4 text-slate-500">{log.ref}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 font-bold tracking-wider px-2 py-0.5 rounded text-[10px] uppercase font-sans ${log.status === "Success" ? "bg-emerald-100 text-emerald-700" : log.status === "Failed" ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-600"}`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedLog(log)}
                      className="px-3 py-1.5 bg-white border border-slate-200 rounded-md text-xs font-semibold text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50 transition-all focus:outline-none focus:ring-2 focus:ring-slate-200 active:bg-slate-100 cursor-pointer inline-flex items-center gap-1 opacity-0 group-hover:opacity-100"
                    >
                      <Terminal className="w-3.5 h-3.5" /> View JSON
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* JSON Modal Overlay */}
      {selectedLog && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedLog(null)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-2xl bg-[#0d1117] rounded-2xl shadow-2xl flex flex-col transform transition-transform duration-300 animate-in fade-in zoom-in-95 overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between bg-[#161b22]">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-slate-400" />
                <h2 className="font-semibold text-slate-200 text-sm">
                  {selectedLog.event}
                </h2>
                <span className="text-xs font-mono text-slate-500 ml-2">
                  ({selectedLog.ref})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-2.5 py-1.5 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 font-medium cursor-pointer rounded-lg hover:bg-slate-800 transition-colors">
                  <Copy className="w-3.5 h-3.5" /> Copy
                </button>
                <button
                  onClick={() => setSelectedLog(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer ml-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* JSON Content Area */}
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              <pre className="text-xs text-slate-300 font-mono leading-relaxed">
                {`{
  "event": "${selectedLog.event.toLowerCase().replace(" ", "_")}",
  "timestamp": "${new Date().toISOString()}",
  "provider": "${selectedLog.provider}",
  "reference": "${selectedLog.ref}",
  "request": {
    "method": "POST",
    "endpoint": "https://api.${selectedLog.provider.toLowerCase()}.com/v1/charge",
    "headers": {
      "Authorization": "Bearer sk_...masked...",
      "Content-Type": "application/json"
    },
    "body": {
      "amount": ${selectedLog.status === "Failed" ? 4500 : 15000},
      "currency": "USD",
      "email": "customer@example.com"
    }
  },
  "response": {
    "status_code": ${selectedLog.status === "Failed" ? 400 : 200},
    "body": {
      "status": ${selectedLog.status === "Failed" ? "false" : "true"},
      "message": "${selectedLog.status === "Failed" ? "Insufficient funds in the account" : "Charge successful"}"
    }
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Logs;
