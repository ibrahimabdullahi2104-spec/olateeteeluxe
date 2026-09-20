import React from 'react';
import { Smartphone, Laptop, Monitor, Maximize2, Sparkles } from 'lucide-react';

export type DeviceMode = 'auto' | 'mobile' | 'laptop' | 'desktop';

interface DeviceModeBarProps {
  currentMode: DeviceMode;
  onModeChange: (mode: DeviceMode) => void;
}

export const DeviceModeBar: React.FC<DeviceModeBarProps> = ({
  currentMode,
  onModeChange
}) => {
  return (
    <aside
      aria-label="Responsive Device Mode Switcher"
      className="w-full bg-[#1b1718] border-b border-stone-800 text-stone-200 py-1.5 px-3 sm:px-4 text-xs select-none sticky top-0 z-50 shadow-md"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Left Indicator */}
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c83264]" />
          </span>
          <span className="font-semibold text-white tracking-wide text-[11px] sm:text-xs">
            Responsive Modes:
          </span>
          <span className="text-[10px] text-stone-400 hidden sm:inline">
            (Phone • Laptop • Desktop)
          </span>
        </div>

        {/* Device Switcher Buttons */}
        <div className="flex items-center gap-1 bg-stone-900/90 p-0.5 rounded-full border border-stone-800">
          <button
            onClick={() => onModeChange('mobile')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
              currentMode === 'mobile'
                ? 'bg-[#c83264] text-white shadow-xs'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
            title="Preview Mobile Phone Viewport (390px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Phone</span>
          </button>

          <button
            onClick={() => onModeChange('laptop')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
              currentMode === 'laptop'
                ? 'bg-[#c83264] text-white shadow-xs'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
            title="Preview Laptop Viewport (1024px)"
          >
            <Laptop className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Laptop</span>
          </button>

          <button
            onClick={() => onModeChange('desktop')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
              currentMode === 'desktop'
                ? 'bg-[#c83264] text-white shadow-xs'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
            title="Preview Desktop Viewport (1440px)"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">Desktop</span>
          </button>

          <button
            onClick={() => onModeChange('auto')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
              currentMode === 'auto'
                ? 'bg-stone-700 text-white shadow-xs'
                : 'text-stone-400 hover:text-white hover:bg-stone-800'
            }`}
            title="Auto Fluid Responsive to window size"
          >
            <Maximize2 className="w-3 h-3" />
            <span>Fluid</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
