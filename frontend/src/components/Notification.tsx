import React from 'react';
import { AlertCircle, Terminal, Activity } from 'lucide-react';
import { Notification as NotificationType } from '../hooks/useProducts';

interface NotificationProps {
    notification: NotificationType | null;
}

const Notification: React.FC<NotificationProps> = ({ notification }) => {
    if (!notification) return null;

    const isError = notification.type === 'error';

    return (
        <div className="fixed top-24 right-6 z-[100] group">
            {/* Ambient Background Glow */}
            <div className={`absolute inset-0 blur-2xl opacity-20 ${isError ? 'bg-red-500' : 'bg-[#00d2d3]'}`} />

            <div className={`relative flex items-center gap-4 px-6 py-5 rounded-[1.25rem] shadow-2xl animate-in slide-in-from-right-8 duration-500 ${isError ? 'bg-red-950/60 border border-red-500/20' : 'bg-slate-900/60 border border-[#00d2d3]/20'} backdrop-blur-3xl`}>
                <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${isError ? 'bg-red-500/20 text-red-400' : 'bg-[#00d2d3]/20 text-[#00d2d3]'}`}>
                    {isError ? <AlertCircle size={22} /> : <Activity size={22} className="animate-pulse" />}
                </div>

                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Terminal size={10} className="opacity-40" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">System Message</span>
                    </div>
                    <p className={`text-sm font-bold tracking-tight ${isError ? 'text-red-200' : 'text-slate-100'}`}>
                        {notification.msg}
                    </p>
                </div>

                {/* Status Bar Decor */}
                <div className={`absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-[3000ms] ease-linear w-full ${isError ? 'bg-red-500' : 'bg-[#00d2d3] shadow-[0_0_15px_rgba(0,210,211,0.5)]'}`} />
            </div>
        </div>
    );
};

export default Notification;
