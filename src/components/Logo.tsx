export interface LogoProps {
  variant?: 'light-badge' | 'dark-badge' | 'inline' | 'transparent';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ variant = 'light-badge', className = '', size = 'md' }: LogoProps) {
  if (variant === 'light-badge') {
    return (
      <div className={`inline-flex items-center bg-white px-3.5 py-1.5 rounded-lg shadow-sm border border-slate-200/80 ${className}`}>
        <div className="flex items-center gap-2">
          {/* Stylized Logo Icon: Geometric butterfly / W emblem with accent node */}
          <div className="relative flex items-center justify-center w-7 h-7">
            <svg viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-6 text-black">
              {/* Outer wings */}
              <path d="M4 6L14 26L20 14L26 26L36 6L28 6L23 18L20 11L17 18L12 6L4 6Z" fill="#111827" />
              {/* Center peak accents */}
              <path d="M16 4L20 10L24 4H20H16Z" fill="#0284c7" />
              {/* Registered mark circle */}
              <circle cx="36" cy="7" r="2.5" stroke="#111827" strokeWidth="0.8" fill="none" />
            </svg>
          </div>
          <div className="flex flex-col text-left">
            <div className="text-[14px] font-extrabold tracking-tight text-slate-900 leading-tight flex items-center font-sans">
              <span>MARKETINGLU</span>
            </div>
            <span className="text-[7.5px] font-semibold text-slate-500 tracking-wider uppercase leading-none mt-0.5">
              Digital Brand Management
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-cyan-400 p-[1.5px] shadow-sm shadow-cyan-500/30">
        <div className="w-full h-full bg-[#070b14] rounded-[7px] flex items-center justify-center">
          <svg viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-4 text-cyan-400">
            <path d="M4 6L14 26L20 14L26 26L36 6L28 6L23 18L20 11L17 18L12 6L4 6Z" fill="#38bdf8" />
            <path d="M16 4L20 10L24 4H20H16Z" fill="#38bdf8" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col text-left">
        <span className="text-[16px] font-extrabold tracking-tight text-white leading-tight font-sans">
          MARKETING<span className="text-cyan-400">LU</span>
        </span>
        <span className="text-[8px] font-semibold text-slate-400 tracking-wider uppercase leading-none mt-0.5">
          Digital Brand Management
        </span>
      </div>
    </div>
  );
}
