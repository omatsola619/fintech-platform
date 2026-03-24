import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function Installation() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-slate-900">
      <h1 className="font-['Outfit'] text-4xl md:text-5xl font-bold mb-6 text-black">
        Installation
      </h1>

      <h2 className="font-['Outfit'] text-3xl font-bold mb-4 mt-8 border-b border-slate-200 pb-2 text-black">
        Provider Performance Metrics
      </h2>
      <p className="text-slate-600 mb-4">
        The platform tracks key provider performance metrics including:
      </p>
      <ul className="space-y-1 mb-6 text-slate-600 list-disc list-inside ml-2">
        <li>total transactions</li>
        <li>success rate</li>
        <li>failure rate</li>
        <li>average latency</li>
      </ul>
      <p className="text-slate-600 mb-12">
        These metrics will be used in future versions to power{" "}
        <strong>automatic routing decisions</strong> and smart failover mechanisms.
      </p>

      {/* Navigation Footer */}
      <div className="grid grid-cols-2 gap-4 items-center py-8 mt-16 border-t border-slate-200">
        <Link
          to="/docs/authentication"
          className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors group cursor-pointer min-w-0"
        >
          <div className="w-10 h-10 shrink-0 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors">
            <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-blue-600 rotate-180" />
          </div>
          <div className="text-left min-w-0 pr-2">
            <span className="text-xs text-slate-500 uppercase tracking-wider block">
              Previous
            </span>
            <span className="font-medium text-blue-600 group-hover:text-blue-500 block truncate">
              Authentication
            </span>
          </div>
        </Link>
        <Link
          to="/docs/initiate-payment"
          className="flex items-center justify-end gap-2 text-slate-600 hover:text-blue-600 transition-colors group cursor-pointer min-w-0"
        >
          <div className="text-right min-w-0 pl-2">
            <span className="text-xs text-slate-500 uppercase tracking-wider block">
              Next
            </span>
            <span className="font-medium text-blue-600 group-hover:text-blue-500 block truncate">
              Initiate Payment
            </span>
          </div>
          <div className="w-10 h-10 shrink-0 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors">
            <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-blue-600" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Installation;
