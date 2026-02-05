import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="relative z-10 max-w-[1600px] mx-auto px-6 py-20 border-t border-white/5 mt-20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-10 opacity-40">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em]">Node Cluster Alpha-9</p>
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em]">&copy; 2026 Distributed Archive. All rights ignored.</p>
                <div className="flex gap-8">
                    <a href="#" className="text-[10px] font-black uppercase tracking-[0.4em] hover:text-cyan-400 trasition-colors">Protocols</a>
                    <a href="#" className="text-[10px] font-black uppercase tracking-[0.4em] hover:text-cyan-400 trasition-colors">Encryption</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
