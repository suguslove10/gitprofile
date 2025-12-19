import { skeleton } from '../../utils';

const StatusDashboard = ({
    loading,
    onBack,
}: {
    loading: boolean;
    onBack: () => void;
}) => {
    // Mock data for uptime bars (90 days)
    const generateUptimeBars = () => {
        return Array.from({ length: 60 }).map((_, i) => {
            // Randomly make some bars slightly dimmer to look realistic, or all green for "perfect"
            const isDown = i === 12 || i === 45; // Just for visual interest, maybe 1-2 yellow ones
            const isRecent = i > 55;
            return (
                <div
                    key={i}
                    className={`h-8 w-1 rounded-full ${isDown ? 'bg-warning opacity-50' : 'bg-success'
                        } ${isRecent ? 'animate-pulse' : ''}`}
                    style={{ opacity: isDown ? 0.4 : 0.8 + Math.random() * 0.2 }}
                />
            );
        });
    };

    const services = [
        { name: 'Global Edge Network', location: '14 PoPs Active', uptime: '100%' },
        { name: 'API Gateway (v2)', location: 'us-east-1', uptime: '99.99%' },
        { name: 'Authentication Service', location: 'Global Auth', uptime: '100%' },
        { name: 'Database Cluster (Primary)', location: 'multi-az', uptime: '99.98%' },
        { name: 'Static Assets (CDN)', location: 'Edge Caching', uptime: '100%' },
    ];

    if (loading) {
        return (
            <div className="p-4 lg:p-10 space-y-8 max-w-5xl mx-auto">
                {skeleton({ widthCls: 'w-48', heightCls: 'h-10', className: 'mb-8' })}
                <div className="card bg-base-100 p-10 text-center">
                    {skeleton({ widthCls: 'w-64', heightCls: 'h-20', className: 'mx-auto' })}
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 lg:p-10 space-y-8 max-w-5xl mx-auto fade-in">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold text-base-content opacity-70">System Status</h1>
                    <p className="opacity-50 mt-1">Real-time health of Suguresh's infrastructure</p>
                </div>
                <button
                    onClick={onBack}
                    className="btn btn-outline btn-sm gap-2"
                >
                    ← Portfolio
                </button>
            </div>

            {/* Hero Operational Card */}
            <div className="card bg-success/10 border border-success/20 p-8 lg:p-12 text-center rounded-box">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-success">All Systems Operational</h2>
                    <p className="text-success/70 font-medium">As of Dec 19, 2025 • Checked 2 mins ago</p>
                </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card bg-base-100 p-6 border border-white/5">
                    <p className="text-sm opacity-50 uppercase tracking-widest font-bold">Uptime (30d)</p>
                    <p className="text-3xl font-bold text-primary mt-2">99.998%</p>
                </div>
                <div className="card bg-base-100 p-6 border border-white/5">
                    <p className="text-sm opacity-50 uppercase tracking-widest font-bold">Avg. Latency</p>
                    <p className="text-3xl font-bold text-secondary mt-2">124ms</p>
                </div>
                <div className="card bg-base-100 p-6 border border-white/5">
                    <p className="text-sm opacity-50 uppercase tracking-widest font-bold">Incidents</p>
                    <p className="text-3xl font-bold text-accent mt-2">0 Total</p>
                </div>
            </div>

            {/* Service List */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold opacity-70 px-2">Individual Services</h3>
                <div className="grid grid-cols-1 gap-4">
                    {services.map((service, idx) => (
                        <div key={idx} className="card bg-base-100 p-6 border border-white/5 hover:border-primary/30 transition-all duration-300">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-success"></span>
                                        <span className="font-bold text-lg">{service.name}</span>
                                    </div>
                                    <p className="text-xs opacity-40 font-mono tracking-tighter uppercase">{service.location}</p>
                                </div>

                                <div className="flex flex-col items-end gap-2 overflow-hidden">
                                    <div className="flex gap-1">
                                        {generateUptimeBars()}
                                    </div>
                                    <div className="flex justify-between w-full text-[10px] font-mono opacity-30 mt-1 uppercase">
                                        <span>90 days ago</span>
                                        <span className="font-bold text-success">{service.uptime} uptime</span>
                                        <span>Today</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Response Time Chart (SVG Mock) */}
            <div className="card bg-base-100 p-6 border border-white/5">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold opacity-70 text-lg">Response Time (ms)</h3>
                    <div className="badge badge-outline opacity-40">Last 24 Hours</div>
                </div>
                <div className="h-32 w-full relative group">
                    <svg
                        viewBox="0 0 1000 100"
                        className="w-full h-full preserve-3d"
                        preserveAspectRatio="none"
                    >
                        <defs>
                            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M0,80 Q50,70 100,75 T200,60 T300,65 T400,50 T500,55 T600,40 T700,45 T800,30 T900,35 T1000,20 L1000,100 L0,100 Z"
                            fill="url(#chartGradient)"
                        />
                        <path
                            d="M0,80 Q50,70 100,75 T200,60 T300,65 T400,50 T500,55 T600,40 T700,45 T800,30 T900,35 T1000,20"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="2"
                            className="stroke-primary"
                        />
                    </svg>
                    <div className="absolute inset-0 flex justify-between pointer-events-none opacity-20 text-[10px] font-mono mt-2">
                        {Array.from({ length: 12 }).map((_, i) => <div key={i} className="border-l border-white h-full" />)}
                    </div>
                </div>
            </div>

            {/* Footer / Past Incidents */}
            <div className="text-center pb-10">
                <p className="text-sm opacity-40">Interested in the tech stack behind this? It's all automated with GitHub Actions & Terraform.</p>
                <div className="mt-4 flex justify-center gap-4 text-xs font-bold uppercase tracking-widest text-primary opacity-60">
                    <a href="#" className="hover:underline">View History</a>
                    <span className="opacity-20">|</span>
                    <a href="#" className="hover:underline">Privacy Policy</a>
                    <span className="opacity-20">|</span>
                    <a href="#" className="hover:underline">RSS Feed</a>
                </div>
            </div>
        </div>
    );
};

export default StatusDashboard;
