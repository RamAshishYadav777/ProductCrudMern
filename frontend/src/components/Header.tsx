import React from 'react';
import { Package, TrendingUp, BarChart3 } from 'lucide-react';

const Header: React.FC = () => {
    return (
        <header className="mb-20 relative">
            <div className="space-y-8">
                <div className="space-y-4">
                    <h1 className="text-6xl md:text-7xl font-black tracking-tight leading-tight">
                        <span className="text-slate-700">Manage your</span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600">Warehouse</span>
                    </h1>
                    <div className="h-1.5 w-32 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full shadow-lg shadow-cyan-200" />
                </div>

                <p className="text-slate-600 text-xl max-w-2xl leading-relaxed font-medium">
                    Streamline your inventory with our intuitive management system.
                    Track, organize, and optimize your products effortlessly.
                </p>

                {/* Feature Pills */}
                <div className="flex flex-wrap gap-3 pt-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
                        <Package size={16} className="text-cyan-600" />
                        <span className="text-sm font-semibold text-slate-700">Easy Management</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
                        <TrendingUp size={16} className="text-blue-600" />
                        <span className="text-sm font-semibold text-slate-700">Real-time Updates</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
                        <BarChart3 size={16} className="text-indigo-600" />
                        <span className="text-sm font-semibold text-slate-700">Smart Analytics</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
