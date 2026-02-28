import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, ArrowLeft } from 'lucide-react';

function ResetPassword() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        // Proceed to reset logic
        navigate('/auth/login', { state: { message: "Password reset successful. Please login." } });
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-slate-900">
            <Link to="/auth/login" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors mb-8 cursor-pointer">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to log in
            </Link>

            <div className="mb-10 text-center">
                <h1 className="font-['Outfit'] text-3xl font-bold mb-3 text-black">Set new password</h1>
                <p className="text-slate-600">Your new password must be different from previous used passwords.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 text-slate-900 transition-colors"
                            placeholder="••••••••"
                        />
                    </div>
                    <p className="mt-2 text-xs text-slate-500">Must be at least 8 characters long.</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-slate-50 text-slate-900 transition-colors"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={!password || password !== confirmPassword}
                    className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm shadow-blue-500/30 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all group cursor-pointer"
                >
                    Reset Password
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </form>
        </div>
    );
}

export default ResetPassword;
