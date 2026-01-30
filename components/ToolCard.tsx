import React from 'react';
import { DiagnosticTool } from '../types';
import { getCategoryColor } from '../utils/categoryColors';

interface ToolCardProps {
  tool: DiagnosticTool;
  onClick?: (toolId?: string) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(tool.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer bg-white dark:bg-slate-900 p-6 rounded-sm border border-slate-200 dark:border-slate-800 hover:border-primary transition-all hover:shadow-xl flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col gap-2">
          <span className="material-symbols-outlined text-scientific-blue text-2xl group-hover:text-primary transition-colors">{tool.icon}</span>
          <span className={`text-[8px] font-black px-2 py-0.5 rounded-full border uppercase tracking-widest w-fit ${getCategoryColor(tool.category)}`}>
            {tool.category}
          </span>
        </div>
        <span className="text-[9px] font-black bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-sm uppercase tracking-widest text-slate-500">{tool.time}</span>
      </div>
      <h3 className="font-black text-sm uppercase mb-2 tracking-tight group-hover:text-primary transition-colors">{tool.title}</h3>
      <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-6 leading-relaxed flex-1">{tool.description}</p>
      <div className="h-px bg-slate-100 dark:bg-slate-800 w-full mb-4"></div>
      <button className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group-hover:text-primary transition-colors group/btn">
        Execute <span className="material-symbols-outlined text-xs group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
      </button>
    </div>
  );
};

export default ToolCard;
