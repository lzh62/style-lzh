
import React from 'react';
import { StyleOption } from '../types';

interface StylePickerProps {
  styles: StyleOption[];
  selectedStyle: StyleOption | null;
  onSelect: (style: StyleOption) => void;
  isLoading: boolean;
}

const StylePicker: React.FC<StylePickerProps> = ({ styles, selectedStyle, onSelect, isLoading }) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {styles.map((style) => (
        <button
          key={style.id}
          disabled={isLoading}
          onClick={() => onSelect(style)}
          className={`relative group flex flex-col items-center p-4 rounded-2xl border transition-all duration-300 ${
            selectedStyle?.id === style.id 
              ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.2)]' 
              : 'border-white/5 bg-slate-900/40 hover:border-white/20 hover:bg-slate-900/60'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${style.color} text-white shadow-lg`}>
            <i className={`fas ${style.icon}`}></i>
          </div>
          <span className="text-sm font-bold text-white mb-1">{style.name}</span>
          <span className="text-[10px] text-slate-500 text-center leading-tight">{style.description}</span>
          
          {selectedStyle?.id === style.id && !isLoading && (
            <div className="absolute top-2 right-2">
              <i className="fas fa-check-circle text-indigo-500 text-xs"></i>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default StylePicker;
