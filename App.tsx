
import React, { useState, useCallback } from 'react';
import { UserImage, StyleOption, ProcessingState } from './types';
import { editImageWithGemini } from './services/geminiService';
import ImageUploader from './components/ImageUploader';
import StylePicker from './components/StylePicker';
import ResultDisplay from './components/ResultDisplay';

const PREDEFINED_STYLES: StyleOption[] = [
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    description: 'Neon-lit futuristic vibe',
    prompt: 'Transform this image into a high-contrast cyberpunk city style. Use vibrant neon purples, electric blues, and pinks. Add glowing lights, digital artifacts, and a futuristic sci-fi aesthetic.',
    icon: 'fa-microchip',
    color: 'bg-purple-600'
  },
  {
    id: 'ghibli',
    name: 'Studio Ghibli',
    description: 'Whimsical anime style',
    prompt: 'Redraw this image in the soft, whimsical, and hand-painted animation style of Studio Ghibli. Use lush green landscapes, soft lighting, and high-saturation natural colors.',
    icon: 'fa-leaf',
    color: 'bg-green-500'
  },
  {
    id: 'oil-painting',
    name: 'Impressionist',
    description: 'Rich brushstroke texture',
    prompt: 'Convert this photo into a classical Impressionist oil painting. Emphasize visible, expressive brushstrokes, rich textures, and play with light and color like Claude Monet.',
    icon: 'fa-palette',
    color: 'bg-orange-500'
  },
  {
    id: 'sketch',
    name: 'Pencil Sketch',
    description: 'Detailed hand-drawn art',
    prompt: 'Create a detailed pencil sketch of this image. Use realistic shading, fine cross-hatching, and graphite textures on a slightly textured off-white paper background.',
    icon: 'fa-pencil-alt',
    color: 'bg-gray-600'
  },
  {
    id: 'retro-wave',
    name: 'Retro Wave',
    description: '80s synthwave aesthetic',
    prompt: 'Apply a 1980s Retro Wave / Synthwave aesthetic. Add chrome reflections, grid patterns in the distance, a massive glowing sun, and a warm, saturated sunset color palette.',
    icon: 'fa-sun',
    color: 'bg-pink-500'
  },
  {
    id: 'voxel',
    name: 'Voxel Art',
    description: '3D blocky geometry',
    prompt: 'Convert this image into a 3D voxel art style, similar to Minecraft. Everything should be made of tiny colorful cubes. Maintain the original composition but interpret it entirely through blocky, voxelized geometry.',
    icon: 'fa-cube',
    color: 'bg-indigo-500'
  },
  {
    id: 'stained-glass',
    name: 'Stained Glass',
    description: 'Cathedral window mosaic',
    prompt: 'Reimagine this photo as a vibrant stained glass window. Use thick black lead outlines separating sections of glowing, translucent colored glass. The light should seem to be passing through it from behind.',
    icon: 'fa-th-large',
    color: 'bg-yellow-500'
  },
  {
    id: 'paper-cutout',
    name: 'Paper Cutout',
    description: 'Layered craft style',
    prompt: 'Transform this image into a multi-layered paper cutout art style. Each element should look like a distinct piece of textured cardstock layered on top of another, with subtle drop shadows between layers to create a 3D depth effect.',
    icon: 'fa-scissors',
    color: 'bg-rose-400'
  },
  {
    id: 'ukiyo-e',
    name: 'Ukiyo-e',
    description: 'Japanese woodblock',
    prompt: 'Redraw this image in the style of traditional Japanese Ukiyo-e woodblock prints. Use flat areas of color, bold outlines, and traditional textures reminiscent of Hokusai or Hiroshige. Include stylized elements if appropriate.',
    icon: 'fa-torii-gate',
    color: 'bg-red-600'
  },
  {
    id: 'blueprint',
    name: 'Blueprint',
    description: 'Technical schematic',
    prompt: 'Turn this image into a detailed architectural blueprint. Use a deep cyan background with crisp white technical lines, grid patterns, and faint handwritten annotations or measurements.',
    icon: 'fa-ruler-combined',
    color: 'bg-blue-700'
  }
];

const App: React.FC = () => {
  const [userImage, setUserImage] = useState<UserImage | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<StyleOption | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [processing, setProcessing] = useState<ProcessingState>({
    isLoading: false,
    error: null,
    resultImageUrl: null,
    resultDescription: null,
  });

  const handleImageUpload = (image: UserImage) => {
    setUserImage(image);
    setProcessing(prev => ({ ...prev, resultImageUrl: null, resultDescription: null, error: null }));
  };

  const handleApplyStyle = async (style: StyleOption | string) => {
    if (!userImage) return;

    setProcessing({
      isLoading: true,
      error: null,
      resultImageUrl: null,
      resultDescription: null,
    });

    try {
      const prompt = typeof style === 'string' ? style : style.prompt;
      const { imageUrl, description } = await editImageWithGemini(
        userImage.base64,
        userImage.mimeType,
        prompt
      );

      setProcessing({
        isLoading: false,
        error: null,
        resultImageUrl: imageUrl,
        resultDescription: description,
      });
    } catch (err) {
      setProcessing({
        isLoading: false,
        error: err instanceof Error ? err.message : 'An unknown error occurred',
        resultImageUrl: null,
        resultDescription: null,
      });
    }
  };

  const resetAll = () => {
    setUserImage(null);
    setSelectedStyle(null);
    setCustomPrompt('');
    setProcessing({
      isLoading: false,
      error: null,
      resultImageUrl: null,
      resultDescription: null,
    });
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect p-4 border-b border-white/10 mb-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <i className="fas fa-magic text-white text-xl"></i>
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              VisionStyle AI
            </h1>
          </div>
          {userImage && (
            <button 
              onClick={resetAll}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              Start Over
            </button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4">
        {!userImage ? (
          <div className="max-w-2xl mx-auto text-center py-12">
            <h2 className="text-4xl font-extrabold mb-4">Transform Your Photos Instantly</h2>
            <p className="text-slate-400 text-lg mb-10">
              Upload an image and let Gemini 2.5 Flash Image reimagine it in any style you can dream of.
            </p>
            <ImageUploader onUpload={handleImageUpload} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Control Panel */}
            <div className="lg:col-span-5 space-y-6">
              <div className="glass-effect rounded-3xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <i className="fas fa-sliders text-indigo-400"></i>
                  Choose a Style
                </h3>
                <StylePicker 
                  styles={PREDEFINED_STYLES}
                  selectedStyle={selectedStyle}
                  onSelect={(style) => {
                    setSelectedStyle(style);
                    handleApplyStyle(style);
                  }}
                  isLoading={processing.isLoading}
                />

                <div className="mt-8">
                  <h3 className="text-sm font-medium text-slate-400 mb-3 uppercase tracking-wider">
                    Or Use Custom Instructions
                  </h3>
                  <div className="relative">
                    <textarea
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      placeholder='e.g., "Add a snowy winter atmosphere" or "Make it look like a vintage 1920s photo"'
                      className="w-full bg-slate-900/50 border border-white/10 rounded-2xl p-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none h-28"
                    />
                    <button
                      disabled={!customPrompt.trim() || processing.isLoading}
                      onClick={() => handleApplyStyle(customPrompt)}
                      className="absolute bottom-3 right-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-400 px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2"
                    >
                      {processing.isLoading ? (
                        <i className="fas fa-spinner fa-spin"></i>
                      ) : (
                        <i className="fas fa-paper-plane"></i>
                      )}
                      Apply
                    </button>
                  </div>
                </div>
              </div>

              {/* Preview Original */}
              <div className="glass-effect rounded-3xl p-4 overflow-hidden">
                <p className="text-xs font-bold text-slate-500 uppercase mb-3 px-2">Original Reference</p>
                <img 
                  src={userImage.preview} 
                  alt="Original" 
                  className="w-full rounded-2xl object-cover max-h-[300px]"
                />
              </div>
            </div>

            {/* Output Display */}
            <div className="lg:col-span-7">
              <ResultDisplay 
                processing={processing}
                originalImage={userImage.preview}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
