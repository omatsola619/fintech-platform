import { useState } from "react";
import {
  Search,
  Filter,
  ArrowRight,
  Server,
  ChevronRight,
  X,
  Copy,
  CheckCircle2,
  Clock,
  XCircle,
  ChevronLeft,
} from "lucide-react";

const MOCK_TRANSACTIONS = [
  {
    id: "1",
    ref: "tx_pay_90210a",
    provider: "Paystack",
    amount: "$150.00",
    channel: "Card",
    status: "Success",
    latency: "240ms",
    reason: "-",
    time: "Today, 2:45 PM",
  },
  {
    id: "2",
    ref: "tx_flw_10293b",
    provider: "Flutterwave",
    amount: "$45.00",
    channel: "Transfer",
    status: "Failed",
    latency: "1,200ms",
    reason: "Insufficient Funds",
    time: "Today, 2:30 PM",
  },
  {
    id: "3",
    ref: "tx_pay_88820c",
    provider: "Paystack",
    amount: "$999.00",
    channel: "Card",
    status: "Processing",
    latency: "400ms",
    reason: "-",
    time: "Today, 1:15 PM",
  },
  {
    id: "4",
    ref: "tx_pay_11220d",
    provider: "Paystack",
    amount: "$12.50",
    channel: "Card",
    status: "Success",
    latency: "180ms",
    reason: "-",
    time: "Yesterday",
  },
  {
    id: "5",
    ref: "tx_flw_77293e",
    provider: "Flutterwave",
    amount: "$85.00",
    channel: "Mobile Money",
    status: "Success",
    latency: "350ms",
    reason: "-",
    time: "Yesterday",
  },
  {
    id: "6",
    ref: "tx_pay_33410f",
    provider: "Paystack",
    amount: "$2,100.00",
    channel: "Transfer",
    status: "Success",
    latency: "210ms",
    reason: "-",
    time: "Yesterday",
  },
  {
    id: "7",
    ref: "tx_flw_99210g",
    provider: "Flutterwave",
    amount: "$60.00",
    channel: "Card",
    status: "Failed",
    latency: "4,500ms",
    reason: "Timeout",
    time: "Oct 24, 2023",
  },
];

function Transactions() {
  const [selectedTx, setSelectedTx] = useState<any>(null);

  const StatusBadge = ({ status }: { status: string }) => {
    if (status === "Success")
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded uppercase">
          <CheckCircle2 className="w-3 h-3" /> Success
        </span>
      );
    if (status === "Failed")
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider text-red-700 bg-red-100 px-2 py-0.5 rounded uppercase">
          <XCircle className="w-3 h-3" /> Failed
        </span>
      );
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded uppercase">
        <Clock className="w-3 h-3" /> Processing
      </span>
    );
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col h-[calc(100vh-6rem)] animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden relative">
      {/* Header & Filters */}
      <div className="shrink-0 space-y-4 mb-6">
        <div>
          <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-bold text-black mb-1">
            Transactions
          </h1>
          <p className="text-slate-600 text-sm">
            Monitor all transaction attempts across providers.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by reference..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
              <option>All Providers</option>
              <option>Paystack</option>
              <option>Flutterwave</option>
            </select>
            <select className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
              <option>All Statuses</option>
              <option>Success</option>
              <option>Failed</option>
              <option>Processing</option>
            </select>
            <button className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm cursor-pointer flex items-center gap-2">
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col relative z-10 w-full mb-10">
        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 sticky top-0 z-10 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium">Reference</th>
                <th className="px-6 py-4 font-medium">Provider</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Channel</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Reason</th>
                <th className="px-6 py-4 font-medium text-right">Time</th>
                <th className="px-6 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_TRANSACTIONS.map((tx) => (
                <tr
                  key={tx.id}
                  className="hover:bg-slate-50 transition-colors group"
                >
                  <td className="px-6 py-4 font-mono text-xs text-blue-600 font-medium">
                    {tx.ref}
                  </td>
                  <td className="px-6 py-4 text-slate-900 flex items-center gap-2 font-medium">
                    <Server className="w-3.5 h-3.5 text-slate-400" />{" "}
                    {tx.provider}
                  </td>
                  <td className="px-6 py-4 text-slate-900 font-semibold">
                    {tx.amount}
                  </td>
                  <td className="px-6 py-4 text-slate-600">{tx.channel}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={tx.status} />
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs">
                    {tx.reason}
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-right">
                    {tx.time}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSelectedTx(tx)}
                      className="text-xs font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-slate-50 border-t border-slate-200 p-3 px-6 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">
            Showing 1 to 7 of 4,204 transactions
          </span>
          <div className="flex items-center gap-2">
            <button
              className="p-1 rounded bg-white border border-slate-200 text-slate-400 hover:text-slate-600 shadow-sm cursor-pointer disabled:opacity-50"
              disabled
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1 rounded bg-white border border-slate-200 text-slate-600 hover:text-slate-900 shadow-sm cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Transaction Detail Drawer Overlay */}
      {selectedTx && (
        <div className="absolute inset-0 z-50 flex overflow-hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedTx(null)}
          />

          {/* Slide-over */}
          <div className="absolute top-0 right-0 h-full w-full sm:w-[500px] bg-white shadow-2xl border-l border-slate-200 flex flex-col transform transition-transform duration-300 translate-x-0 animate-in slide-in-from-right">
            {/* Header */}
            <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
              <div>
                <h2 className="font-semibold text-slate-900">
                  Transaction Details
                </h2>
                <p className="text-xs font-mono text-slate-500 mt-0.5">
                  {selectedTx.ref}
                </p>
              </div>
              <button
                onClick={() => setSelectedTx(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <div className="bg-slate-50 rounded-xl p-5 flex items-center justify-between border border-slate-100">
                <div>
                  <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">
                    Amount Processed
                  </p>
                  <p className="font-['Outfit'] text-3xl font-bold text-slate-900">
                    {selectedTx.amount}
                  </p>
                </div>
                <div className="text-right flex flex-col items-end gap-2">
                  <StatusBadge status={selectedTx.status} />
                  <p className="text-xs text-slate-500 font-medium">
                    {selectedTx.time}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900 text-sm border-b border-slate-100 pb-2">
                  Overview
                </h3>
                <div className="grid grid-cols-2 gap-y-4 text-sm">
                  <div>
                    <p className="text-slate-500 text-xs mb-1">Provider</p>
                    <p className="font-medium text-slate-900">
                      {selectedTx.provider}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs mb-1">Channel</p>
                    <p className="font-medium text-slate-900">
                      {selectedTx.channel}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs mb-1">Total Latency</p>
                    <p className="font-medium text-slate-900">
                      {selectedTx.latency}
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs mb-1">
                      Failure Reason
                    </p>
                    <p className="font-medium text-slate-900">
                      {selectedTx.reason}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900 text-sm border-b border-slate-100 pb-2">
                  Timeline
                </h3>
                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                  <div className="relative flex items-start gap-4 text-sm z-10">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 border border-white ring-4 ring-white shadow-sm mt-0.5">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                    <div className="bg-white border text-left flex-1 p-3 rounded-xl border-slate-200 shadow-sm">
                      <p className="font-medium text-slate-900">
                        Request Initiated
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        PayFlow engine receives standard /charge payload
                      </p>
                    </div>
                  </div>
                  <div className="relative flex items-start gap-4 text-sm z-10">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 border border-white ring-4 ring-white shadow-sm mt-0.5">
                      <Server className="w-3 h-3" />
                    </div>
                    <div className="bg-white border text-left flex-1 p-3 rounded-xl border-slate-200 shadow-sm">
                      <p className="font-medium text-slate-900">
                        Provider Match
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Routed to {selectedTx.provider} due to active healthy
                        state
                      </p>
                    </div>
                  </div>
                  <div className="relative flex items-start gap-4 text-sm z-10">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border border-white ring-4 ring-white shadow-sm mt-0.5 ${selectedTx.status === "Success" ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"}`}
                    >
                      {selectedTx.status === "Success" ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
                    </div>
                    <div className="bg-white border text-left flex-1 p-3 rounded-xl border-slate-200 shadow-sm">
                      <p className="font-medium text-slate-900">
                        Final Outcome
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Provider returned status: {selectedTx.status}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="font-semibold text-slate-900 text-sm">
                    Provider Response (Raw)
                  </h3>
                  <button className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium cursor-pointer">
                    <Copy className="w-3 h-3" /> Copy JSON
                  </button>
                </div>
                <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto shadow-inner">
                  <pre className="text-xs text-slate-300 font-mono">
                    {`{
  "status": "${selectedTx.status === "Success" ? "true" : "false"}",
  "message": "${selectedTx.status === "Success" ? "Charge attempt successful" : selectedTx.reason}",
  "data": {
    "id": 1234567,
    "domain": "test",
    "status": "${selectedTx.status.toLowerCase()}",
    "reference": "${selectedTx.ref}",
    "amount": ${selectedTx.amount.replace(/[^0-9.]/g, "")},
    "message": null,
    "gateway_response": "${selectedTx.status === "Success" ? "Approved" : "Declined"}",
    "paid_at": "${new Date().toISOString()}",
    "created_at": "${new Date().toISOString()}",
    "channel": "card",
    "currency": "USD"
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Transactions;
