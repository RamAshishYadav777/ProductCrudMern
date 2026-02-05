import React from 'react';
import { Database, Plus, ShieldAlert } from 'lucide-react';

interface EmptyStateProps {
    onAction: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onAction }) => {
    return (
        <div className="relative group p-1 flex items-center justify-center">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-cyan-500/5 blur-[100px] rounded-[4rem] group-hover:bg-cyan-500/10 transition-all duration-1000" />

            <div className="relative w-full max-w-2xl bg-slate-900/40 border border-white/5 p-20 rounded-[4rem] text-center backdrop-blur-3xl overflow-hidden group-hover:border-white/10 transition-all duration-500">
                {/* Decorative Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

                <div className="relative z-10">
                    <div className="w-24 h-24 bg-slate-950 border border-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                        <Database size={40} className="text-cyan-500/40 group-hover:text-cyan-400 transition-colors" />
                    </div>

                    <div className="space-y-4 mb-12">
                        <h3 className="text-4xl font-black text-white tracking-tighter uppercase">
                            No Assets <span className="text-cyan-500/60">Located</span>
                        </h3>
                        <p className="text-slate-500 max-w-sm mx-auto text-sm font-medium leading-relaxed">
                            The central mainframe is currently at zero capacity. Synchronize your first product asset to initialize the catalog.
                        </p>
                    </div>

                    <button
                        onClick={onAction}
                        className="button-gloss relative px-10 py-5 bg-white text-slate-950 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl shadow-white/10 hover:shadow-cyan-500/20 active:scale-95 transition-all"
                    >
                        <span className="flex items-center gap-3">
                            <Plus size={18} />
                            Deploy Initial Asset
                        </span>
                    </button>

                    <div className="mt-12 flex items-center justify-center gap-2 text-[9px] font-black text-slate-600 uppercase tracking-[0.4em]">
                        <ShieldAlert size={12} className="text-orange-500/40" />
                        Awaiting Catalog Initialization
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmptyState;
