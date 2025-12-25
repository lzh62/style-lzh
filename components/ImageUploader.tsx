
import React, { useRef } from 'react';
import { UserImage } from '../types';

interface ImageUploaderProps {
  onUpload: (image: UserImage) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        onUpload({
          file: file,
          preview: reader.result as string,
          base64: base64String,
          mimeType: file.type,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div 
      onClick={triggerUpload}
      className="group relative cursor-pointer"
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept="image/*"
      />
      <div className="border-2 border-dashed border-slate-700 group-hover:border-indigo-500/50 rounded-[40px] p-12 transition-all duration-300 bg-slate-900/30 group-hover:bg-slate-800/40">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-300">
            <i className="fas fa-cloud-arrow-up text-3xl text-indigo-400"></i>
          </div>
          <p className="text-xl font-semibold text-white mb-2">Select a photo to style</p>
          <p className="text-slate-500">JPG, PNG or WEBP up to 10MB</p>
          
          <button className="mt-8 bg-white text-slate-900 px-8 py-3 rounded-2xl font-bold shadow-xl shadow-white/5 hover:bg-slate-100 transition-colors">
            Choose File
          </button>
        </div>
      </div>
      
      {/* Decorative Orbs */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  );
};

export default ImageUploader;
