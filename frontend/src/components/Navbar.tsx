import React from 'react';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-slate-950/90 backdrop-blur-2xl text-white py-4 px-10 flex justify-between items-center sticky top-0 z-50 border-b border-white/5 border-t border-[#00d2d3]/20">
            <div className="flex items-center gap-12">
                <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="relative">
                        <div className="absolute -inset-2 bg-gradient-to-r from-[#00d2d3] to-blue-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative w-10 h-10 flex items-center justify-center">
                            <div className="w-6 h-6 border-2 border-[#00d2d3] rounded-lg rotate-45 group-hover:rotate-[225deg] transition-all duration-700 relative">
                                <div className="absolute inset-1 bg-[#00d2d3] rounded-sm opacity-50"></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-black tracking-tighter uppercase leading-none">Admin <span className="text-[#00d2d3]">Pro</span></span>
                        <span className="text-[8px] font-black tracking-[0.4em] text-slate-500 uppercase">Executive Suite</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button className="px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">
                    Login
                </button>
                <div className="h-4 w-[1px] bg-slate-800 mx-2"></div>
                <button className="px-6 py-2 bg-gradient-to-r from-[#00d2d3] to-[#00a8a8] text-slate-950 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(0,210,211,0.2)] hover:shadow-[0_0_25px_rgba(0,210,211,0.4)] active:scale-95 border border-white/10">
                    Sign Up
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
