import { ArrowRight, Terminal } from "lucide-react";
import { Link } from "react-router-dom";

function Installation() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-slate-900">
      <h1 className="font-['Outfit'] text-4xl md:text-5xl font-bold mb-6 text-black">
        Installation
      </h1>

      <p className="text-lg text-slate-600 leading-relaxed mb-8">
        Integrating PayFlow into your application is simple. We provide official
        SDKs for Node.js, Python, Ruby, and Go, as well as native mobile SDKs
        for iOS and Android.
      </p>

      <h2 className="font-['Outfit'] text-2xl font-bold mb-4 mt-8 border-b border-slate-200 pb-2 text-black">
        Node.js / TypeScript
      </h2>
      <p className="text-slate-600 mb-4">
        Our recommended way to install the Node.js library is using npm or yarn.
      </p>

      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-sm text-slate-800 flex items-center justify-between shadow-inner mb-6">
        <span>npm install @payflow/node</span>
        <button className="text-slate-400 hover:text-blue-600 cursor-pointer transition-colors">
          <Terminal className="w-4 h-4" />
        </button>
      </div>
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-sm text-slate-800 flex items-center justify-between shadow-inner mb-8">
        <span>yarn add @payflow/node</span>
        <button className="text-slate-400 hover:text-blue-600 cursor-pointer transition-colors">
          <Terminal className="w-4 h-4" />
        </button>
      </div>

      <h2 className="font-['Outfit'] text-2xl font-bold mb-4 mt-8 border-b border-slate-200 pb-2 text-black">
        Python
      </h2>
      <p className="text-slate-600 mb-4">
        Install the PayFlow Python library via pip. Requires Python 3.7+.
      </p>

      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-sm text-slate-800 flex items-center justify-between shadow-inner mb-8">
        <span>pip install payflow-python</span>
        <button className="text-slate-400 hover:text-blue-600 cursor-pointer transition-colors">
          <Terminal className="w-4 h-4" />
        </button>
      </div>

      <h2 className="font-['Outfit'] text-2xl font-bold mb-4 mt-8 border-b border-slate-200 pb-2 text-black">
        Go
      </h2>
      <p className="text-slate-600 mb-4">
        If you are using Go modules, it is very simple to include:
      </p>

      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-sm text-slate-800 flex items-center justify-between shadow-inner mb-8">
        <span>go get github.com/payflow/payflow-go</span>
        <button className="text-slate-400 hover:text-blue-600 cursor-pointer transition-colors">
          <Terminal className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 items-center py-8 mt-16 border-t border-slate-200">
        <Link
          to="/docs"
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
              Introduction
            </span>
          </div>
        </Link>
        <Link
          to="/docs/authentication"
          className="flex items-center justify-end gap-2 text-slate-600 hover:text-blue-600 transition-colors group cursor-pointer min-w-0"
        >
          <div className="text-right min-w-0 pl-2">
            <span className="text-xs text-slate-500 uppercase tracking-wider block">
              Next
            </span>
            <span className="font-medium text-blue-600 group-hover:text-blue-500 block truncate">
              Authentication
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
