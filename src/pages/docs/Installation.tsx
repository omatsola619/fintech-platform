import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function Installation() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-slate-900">
      <h1 className="font-['Outfit'] text-4xl md:text-5xl font-bold mb-6 text-black">
        Quick Start
      </h1>

      <p className="text-lg text-slate-600 leading-relaxed mb-6">
        To begin using the Fintech Platform API:
      </p>

      <ol className="list-decimal list-inside space-y-3 mb-12 text-slate-600 text-lg ml-2">
        <li>Obtain your API keys</li>
        <li>Send payment requests to our API</li>
        <li>Specify the provider in your request payload</li>
      </ol>

      <h2 className="font-['Outfit'] text-2xl font-bold mb-4 mt-8 border-b border-slate-200 pb-2 text-black">
        Base URL
      </h2>

      <div className="bg-slate-900 rounded-xl p-4 text-sm font-mono text-amber-200 mb-6 shadow-inner overflow-x-auto">
        https://api.fintechplatform.com/v1
      </div>

      <p className="text-slate-600 mb-12">Local development example:</p>

      <h2 className="font-['Outfit'] text-3xl font-bold mb-4 mt-8 border-b border-slate-200 pb-2 text-black">
        Authentication
      </h2>
      <p className="text-slate-600 mb-6">
        All requests must include your <strong>Client Public Key</strong>.
      </p>

      <h3 className="font-semibold text-slate-900 text-xl mb-3">Header</h3>
      <div className="bg-slate-900 rounded-xl p-4 text-sm font-mono text-slate-300 mb-6 shadow-inner overflow-x-auto space-y-2">
        <div>
          <span className="text-emerald-300">Client-Public-Key:</span>{" "}
          pit_pk_live_xxxxxxxx
        </div>
        <div>
          <span className="text-emerald-300">Client-Secret-Key:</span>{" "}
          pit_sk_live_xxxxxxxx
        </div>
      </div>

      <p className="text-slate-600 mb-3">Example</p>
      <div className="bg-slate-900 rounded-xl p-6 text-sm font-mono text-slate-300 mb-8 overflow-x-auto shadow-inner leading-relaxed">
        <code>
          curl --location{" "}
          <span className="text-amber-300">
            'http://payinfraterminal.onrender.com/v1/api/initiate-payment/'
          </span>{" "}
          \<br />
          --header{" "}
          <span className="text-amber-300">
            'Client-Public-Key: pit_pk_live_76fd46870e7e8d3d'
          </span>{" "}
          \<br />
          --header{" "}
          <span className="text-amber-300">
            'Client-Secret-Key:
            pit_sk_live_U2C8HtHdlHPRvHcjRBYBYn9DyZPJEf2o_xZqQkUFIf0'
          </span>{" "}
          \<br />
          --header{" "}
          <span className="text-amber-300">
            'Content-Type: application/json'
          </span>{" "}
          \
        </code>
      </div>

      <p className="text-slate-600 mb-3">
        If authentication fails, the API will return:
      </p>
      <div className="bg-slate-900 rounded-xl p-4 text-sm font-mono text-blue-300 mb-12 shadow-inner overflow-x-auto">
        401 Unauthorized
      </div>

      <h2 className="font-['Outfit'] text-3xl font-bold mb-4 mt-8 border-b border-slate-200 pb-2 text-black">
        Initiate Payment
      </h2>
      <p className="text-slate-600 mb-6">Creates a new payment transaction.</p>

      <h3 className="font-semibold text-slate-900 text-xl mb-3">Endpoint</h3>
      <div className="bg-slate-900 rounded-xl p-4 text-sm font-mono text-blue-300 mb-8 shadow-inner overflow-x-auto">
        POST /initiate-payment/
      </div>

      <h3 className="font-semibold text-slate-900 text-lg mb-3">
        Request Body
      </h3>
      <div className="bg-slate-900 rounded-xl p-6 text-sm font-mono text-slate-300 mb-8 overflow-x-auto shadow-inner leading-relaxed">
        <pre>
          {`{
  "provider": "flutterwave",
  "email": "myemail@mail.com",
  "amount": 8000,
  "currency": "ngn", # (Optional)
  "callback_url": "https://payflow.com/payments/", # (Optional)
  "reference": "greatman009" # (Optional)
}`}
        </pre>
      </div>

      <div className="mb-8 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#242424] text-slate-200 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 font-medium">Field</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700 bg-[#1e1e1e] text-slate-300">
            <tr>
              <td className="px-6 py-4 font-mono text-amber-300">provider</td>
              <td className="px-6 py-4 text-blue-300">string</td>
              <td className="px-6 py-4">
                Payment provider to route transaction to
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-mono text-amber-300">email</td>
              <td className="px-6 py-4 text-blue-300">string</td>
              <td className="px-6 py-4">Customer email</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-mono text-amber-300">amount</td>
              <td className="px-6 py-4 text-emerald-300">integer</td>
              <td className="px-6 py-4">Amount to charge</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-mono text-amber-300">currency</td>
              <td className="px-6 py-4 text-blue-300">string</td>
              <td className="px-6 py-4">Transaction currency</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-mono text-amber-300">
                Callback url
              </td>
              <td className="px-6 py-4 text-blue-300">url</td>
              <td className="px-6 py-4">Redirection url</td>
            </tr>
            <tr>
              <td className="px-6 py-4 font-mono text-amber-300">Reference</td>
              <td className="px-6 py-4 text-blue-300">string</td>
              <td className="px-6 py-4">payment reference</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="font-semibold text-slate-900 text-lg mb-3">
        Supported Providers
      </h3>
      <div className="bg-slate-900 rounded-xl p-6 text-sm font-mono text-slate-300 mb-12 shadow-inner">
        <div>paystack</div>
        <div>flutterwave</div>
      </div>

      <h2 className="font-['Outfit'] text-3xl font-bold mb-4 mt-8 border-b border-slate-200 pb-2 text-black">
        Routing Logic (Current MVP)
      </h2>

      <p className="text-slate-600 mb-4">
        The current routing system uses{" "}
        <strong>explicit provider selection</strong>.
      </p>
      <p className="text-slate-600 mb-6">
        The provider is specified directly in the request payload.
      </p>

      <p className="text-slate-600 mb-2">Example:</p>
      <div className="bg-slate-900 rounded-xl p-6 text-sm font-mono text-slate-300 mb-8 shadow-inner">
        <span className="text-blue-300">"provider"</span>:{" "}
        <span className="text-amber-300">"paystack"</span>
      </div>

      <p className="text-slate-600 mb-2">
        The API routes the request to the specified provider.
      </p>
      <div className="bg-slate-900 rounded-xl p-6 text-sm font-mono text-slate-300 mb-8 overflow-x-auto shadow-inner leading-relaxed">
        <pre>
          {`Merchant Request
    |
    ▼
Fintech Platform
    |
    ▼
Selected Provider`}
        </pre>
      </div>

      <p className="text-slate-600 mb-4">
        Future versions of the platform will support{" "}
        <strong>intelligent routing</strong> based on:
      </p>
      <ul className="space-y-1 mb-8 text-slate-600 list-disc list-inside ml-2">
        <li>provider uptime</li>
        <li>success rate</li>
        <li>transaction cost</li>
        <li>latency</li>
        <li>transaction type</li>
      </ul>

      <p className="text-slate-900 font-bold text-lg mb-2 mt-8">
        Example Request
      </p>
      <div className="bg-slate-900 rounded-xl p-6 text-sm font-mono text-slate-300 mb-12 overflow-x-auto shadow-inner leading-relaxed">
        <pre>
          {`curl --location 'http://payinfraterminal.onrender.com/v1/api/initiate-payment/' \\
--header 'Client-Public-Key: pit_pk_live_76fd46870e7e8d3d' \\
--header 'Client-Secret-Key: pit_sk_live_U2C8HtHdlHPRvHcjRBYBYn9DyZPJEf2o_xZqQkUFIf0' \\
--header 'Content-Type: application/json' \\
--data-raw '{
    "provider": "flutterwave",
    "email": "myemail@mail.com",
    "amount": 8000,
  }'`}
        </pre>
      </div>

      <h2 className="font-['Outfit'] text-3xl font-bold mb-4 mt-8 border-b border-slate-200 pb-2 text-black">
        Example Response
      </h2>
      <div className="bg-slate-900 rounded-xl p-6 text-sm font-mono text-slate-300 mb-12 overflow-x-auto shadow-inner leading-relaxed">
        <pre>
          {`{
    "status": "success",
    "message": "Payment initiated successfully",
    "data": {
        "status": "success",
        "message": "Hosted Link",
        "data": {
            "payment_url": "https://checkout-v2.dev-flutterwave.com/v3/hosted/pay/e66bc688e1ad2a8aa51f",
            "access_code": "kjk4j5kjkrjkj4k4434",
            "reference": "kjdkj44jrjlklghjkdcccc88",
            "amount": "8000.00",
            "currency": "NGN",
            "metadata": {},
            "provider": "flutterwave",
            "redirect_url": "https://payflow.com/payments/",
            "status": "success"
        }
    },
    "meta": {
        "request_id": "e279196d-6d1e-4c93-bbf5-49ad2897a951",
        "timestamp": "2026-03-11T11:20:40.001023Z"
    }
}`}
        </pre>
      </div>

      <h2 className="font-['Outfit'] text-3xl font-bold mb-4 mt-8 border-b border-slate-200 pb-2 text-black">
        Unified Response Format
      </h2>
      <p className="text-slate-600 mb-4">
        One of the core features of Fintech Platform is{" "}
        <strong>response normalization</strong>.
      </p>
      <p className="text-slate-600 mb-4">
        Different payment providers return completely different response
        structures.
      </p>
      <p className="text-slate-600 mb-8">
        The platform converts them into a standardized response format.
      </p>

      <h3 className="font-semibold text-slate-900 text-xl mb-3">
        Standard Response Structure
      </h3>
      <div className="bg-slate-900 rounded-xl p-6 text-sm font-mono text-slate-300 mb-8 overflow-x-auto shadow-inner leading-relaxed">
        <pre>
          {`status
message
data`}
        </pre>
      </div>

      <p className="text-slate-600 mb-3">Example:</p>
      <div className="bg-slate-900 rounded-xl p-6 text-sm font-mono text-slate-300 mb-6 overflow-x-auto shadow-inner leading-relaxed">
        <pre>
          {`{
  "status": "success",
  "message": "Payment initialized",
  "data": {}
}`}
        </pre>
      </div>
      <p className="text-slate-600 mb-12">
        This allows developers to write <strong>one integration</strong>{" "}
        regardless of the underlying provider.
      </p>

      <h2 className="font-['Outfit'] text-3xl font-bold mb-4 mt-8 border-b border-slate-200 pb-2 text-black">
        Transaction Tracking
      </h2>
      <p className="text-slate-600 mb-4">
        All transactions created through the API are stored and tracked
        internally.
      </p>
      <p className="text-slate-600 mb-3">Transaction states include:</p>
      <div className="bg-slate-900 rounded-xl p-6 text-sm font-mono text-amber-300 mb-12 overflow-x-auto shadow-inner leading-relaxed">
        <pre>
          {`pending
success
failed
retrying
abandoned`}
        </pre>
      </div>

      <h2 className="font-['Outfit'] text-3xl font-bold mb-4 mt-8 border-b border-slate-200 pb-2 text-black">
        Error Handling
      </h2>
      <p className="text-slate-600 mb-6">
        All API errors follow the same response format.
      </p>

      <h3 className="font-semibold text-slate-900 text-xl mb-3">
        Example Error
      </h3>
      <div className="bg-slate-900 rounded-xl p-6 text-sm font-mono text-slate-300 mb-12 overflow-x-auto shadow-inner leading-relaxed">
        <pre>
          {`{
    "status": "error",
    "message": "Invalid client public key.",
    "error": {
        "code": "authentication_failed",
        "details": {
            "detail": "Invalid client public key."
        }
    },
    "meta": {
        "request_id": "0027dbea-bdd0-4e8b-bb4e-10cee4b776df",
        "timestamp": "2026-03-11T11:21:37.314310Z"
    }
}`}
        </pre>
      </div>

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
        <strong>automatic routing decisions</strong>.
      </p>

      {/* Navigation Footer */}
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
        <div></div>
      </div>
    </div>
  );
}

export default Installation;
