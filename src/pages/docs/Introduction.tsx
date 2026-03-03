import { ArrowRight, Code2, Settings, Zap, Terminal } from "lucide-react";
import { Link } from "react-router-dom";

function Introduction() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-slate-900">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 mb-6 shadow-sm">
        <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">
          PayFlow v2.0 Docs
        </span>
      </div>

      <h1 className="font-['Outfit'] text-4xl md:text-5xl font-bold mb-6 text-black">
        Introduction
      </h1>

      <p className="text-lg text-slate-600 leading-relaxed mb-8">
        Welcome to the PayFlow documentation. PayFlow is the single unifying API
        that connects you to Stripe, PayPal, Square, and over 50+ localized
        payment methods globally. We handle the heavy lifting of routing,
        reconciling, and standardizing payments so you can focus on building
        your product.
      </p>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 mb-10 shadow-sm">
        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-slate-900">
          <Code2 className="text-blue-500" /> Quick Start
        </h3>
        <p className="text-slate-600 mb-4">
          Install the official PayFlow node SDK to get started immediately.
        </p>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-sm text-slate-800 flex items-center justify-between shadow-inner">
          <span>npm install @payflow/node</span>
          <button className="text-slate-400 hover:text-blue-600 cursor-pointer transition-colors">
            <Terminal className="w-4 h-4" />
          </button>
        </div>
      </div>

      <h2 className="font-['Outfit'] text-2xl font-bold mb-4 mt-12 border-b border-slate-200 pb-2 text-black">
        Why PayFlow?
      </h2>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm hover:border-blue-300 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4 border border-blue-100">
            <Settings className="w-5 h-5 text-blue-600" />
          </div>
          <h4 className="font-semibold text-slate-900 mb-2">
            Zero Maintenance
          </h4>
          <p className="text-sm text-slate-600">
            Never update API versions for individual providers again. PayFlow
            abstracts provider updates entirely.
          </p>
        </div>
        <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm hover:border-blue-300 transition-colors">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4 border border-blue-100">
            <Zap className="w-5 h-5 text-blue-600" />
          </div>
          <h4 className="font-semibold text-slate-900 mb-2">Smart Routing</h4>
          <p className="text-sm text-slate-600">
            Transactions are dynamically routed to the provider with the highest
            success rate in the user's region.
          </p>
        </div>
      </div>

      <h2 className="font-['Outfit'] text-2xl font-bold mb-4 mt-10 border-b border-slate-200 pb-2 text-black">
        Creating your first charge
      </h2>
      <p className="text-slate-600 mb-6">
        The <code>create</code> method handles everything. We'll automatically
        identify the card type, determine the best provider route, and process
        the charge natively.
      </p>

      <div className="relative rounded-2xl overflow-hidden mb-12 border border-slate-200 shadow-lg">
        <div className="flex items-center gap-2 bg-slate-50 px-4 py-3 border-b border-slate-200">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-amber-400"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
          <div className="text-xs text-slate-500 ml-2 font-mono">charge.ts</div>
        </div>
        <pre className="text-sm font-mono text-slate-800 bg-white p-6 overflow-x-auto shadow-inner">
          <code>
            <span className="text-pink-600">import</span> &#123; PayFlow &#125;{" "}
            <span className="text-pink-600">from</span>{" "}
            <span className="text-blue-600">'@payflow/node'</span>;<br />
            <br />
            <span className="text-slate-400">
              // Initialize with your secret key
            </span>
            <br />
            <span className="text-blue-700">const</span> payflow ={" "}
            <span className="text-pink-600">new</span>{" "}
            <span className="text-amber-600">PayFlow</span>(
            <span className="text-blue-600">
              'pf_live_a1b2c3d4e5f6g7h8i9j0'
            </span>
            );
            <br />
            <br />
            <span className="text-blue-700">const</span> charge ={" "}
            <span className="text-pink-600">await</span> payflow.charges.
            <span className="text-blue-500">create</span>(&#123;
            <br />
            &nbsp;&nbsp;amount: <span className="text-orange-600">2000</span>,
            <br />
            &nbsp;&nbsp;currency: <span className="text-blue-600">'usd'</span>,
            <br />
            &nbsp;&nbsp;provider: <span className="text-blue-600">'auto'</span>,
            <br />
            &nbsp;&nbsp;source:{" "}
            <span className="text-blue-600">'tok_visa'</span>,<br />
            &nbsp;&nbsp;description:{" "}
            <span className="text-blue-600">
              'Software development services'
            </span>
            <br />
            &#125;);
            <br />
            <br />
            console.<span className="text-blue-500">log</span>(charge.status);{" "}
            <span className="text-slate-400">// 'succeeded'</span>
          </code>
        </pre>
      </div>

      <div className="grid grid-cols-2 gap-4 items-center py-8 mt-16 border-t border-slate-200">
        <div></div>
        <Link
          to="/docs/installation"
          className="flex items-center justify-end gap-2 text-slate-600 hover:text-blue-600 transition-colors group cursor-pointer min-w-0"
        >
          <div className="text-right min-w-0 pl-2">
            <span className="text-xs text-slate-500 uppercase tracking-wider block">
              Next
            </span>
            <span className="font-medium text-blue-600 group-hover:text-blue-500 block truncate">
              Installation
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

export default Introduction;
