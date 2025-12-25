
import React from 'react';
import { ProcessingState } from '../types';

interface ResultDisplayProps {
  processing: ProcessingState;
  originalImage: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ processing, originalImage }) => {
  if (!processing.isLoading && !processing.resultImageUrl && !processing.error) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[500px] border-2 border-dashed border-white/5 rounded-[40px] bg-slate-900/20">
        <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
          <i className="fas fa-magic text-slate-600 text-2xl"></i>
        </div>
        <p className="text-slate-500 font-medium">Select a style to generate result</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="glass-effect rounded-[40px] overflow-hidden shadow-2xl relative min-h-[500px] flex items-center justify-center">
        {processing.isLoading ? (
          <div className="flex flex-col items-center text-center p-12">
            <div className="relative mb-8">
              <div className="w-24 h-24 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-500">
                <i className="fas fa-bolt text-2xl animate-pulse"></i>
              </div>
            </div>
            <h4 className="text-2xl font-bold mb-2">Gemini is styling your photo...</h4>
            <p className="text-slate-400">Reimagining pixels through neural networks</p>
          </div>
        ) : processing.error ? (
          <div className="flex flex-col items-center text-center p-12">
            <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
              <i className="fas fa-circle-exclamation text-red-500 text-3xl"></i>
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Something went wrong</h4>
            <p className="text-red-400 max-w-sm mb-6">{processing.error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="w-full h-full group">
            <img 
              src={processing.resultImageUrl || ''} 
              alt="Generated Result" 
              className="w-full h-auto object-contain animate-in fade-in zoom-in duration-500"
            />
            {processing.resultImageUrl && (
              <a 
                href={processing.resultImageUrl} 
                download="styled-image.png"
                className="absolute bottom-6 right-6 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-4 rounded-2xl flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <i className="fas fa-download"></i>
                <span className="font-bold">Download Result</span>
              </a>
            )}
          </div>
        )}
      </div>

      {processing.resultDescription && !processing.isLoading && (
        <div className="glass-effect p-6 rounded-3xl animate-in slide-in-from-bottom duration-500">
          <div className="flex items-center gap-2 mb-2">
            <i className="fas fa-quote-left text-indigo-400 text-xs"></i>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">AI Concept Note</span>
          </div>
          <p className="text-slate-300 italic leading-relaxed">
            {processing.resultDescription}
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
