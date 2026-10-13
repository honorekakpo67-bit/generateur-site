import React, { useState, useRef } from 'react';
import { ArrowUpIcon, SparklesIcon, ImageIcon, XIcon, MessageSquareIcon } from 'lucide-react';
import { suggestions } from '../data/suggestions';

interface UploadedImage {
  id: string;
  name: string;
  dataUrl: string;
  type: 'hero' | 'gallery';
}

interface PromptComposerProps {
  onGenerate: (prompt: string, images: UploadedImage[], whatsappNumber: string) => void;
}

export function PromptComposer({ onGenerate }: PromptComposerProps) {
  const [value, setValue] = useState('');
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [activeImageType, setActiveImageType] = useState<'hero' | 'gallery'>('hero');
  const [whatsappNumber, setWhatsAppNumber] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canSubmit = value.trim().length > 3;

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    
    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage: UploadedImage = {
          id: crypto.randomUUID(),
          name: file.name,
          dataUrl: e.target?.result as string,
          type: activeImageType
        };
        setImages((prev) => [...prev, newImage]);
      };
      reader.readAsDataURL(file);
    });
    event.target.value = '';
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const submit = () => {
    if (canSubmit) onGenerate(value, images, whatsappNumber);
  };

  return (
    <main className="flex min-h-full w-full flex-col items-center px-6 py-16">
      <div className="w-full max-w-3xl">
        <div className="flex items-center gap-2 text-[13px] text-inkMuted">
          <SparklesIcon className="h-4 w-4 text-accent" />
          <span>DeepSite · DeepSeek-V3 sur Hugging Face</span>
        </div>

        <h1 className="mt-5 text-[44px] font-bold leading-[1.05] tracking-[-0.035em] text-ink sm:text-[56px]">
          Décrivez un site.
          <br />
          <span className="text-inkFaint">Recevez un lien en ligne.</span>
        </h1>
        <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-inkMuted">
          Le code est généré en une seule passe. Publication en ligne : 5000 FCFA par site (fedApi).
          Génération gratuite, essais illimités. Multi-pages, design pro, hébergement inclus.
        </p>

        <form
          className="mt-9"
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}>
          
          <div className="rounded-2xl border border-line bg-surface p-2 transition-colors duration-150 ease-out focus-within:border-inkFaint">
            <label htmlFor="prompt" className="sr-only">
              Décrivez le site à générer
            </label>
            <textarea
              id="prompt"
              rows={4}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
                  event.preventDefault();
                  submit();
                }
              }}
              placeholder="Create a modern landing page with hero section, features grid, and contact form"
              className="w-full resize-none bg-transparent px-3 py-3 text-[15px] leading-relaxed text-ink placeholder:text-inkFaint focus:outline-none" />
            
            <div className="flex items-center justify-between px-3 pb-1 pt-1">
              <button
                type="submit"
                disabled={!canSubmit}
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-[14px] font-semibold text-canvas transition-[background-color,opacity] duration-150 ease-out hover:bg-accentDim disabled:cursor-not-allowed disabled:opacity-40">
                
                Générer
                <ArrowUpIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </form>

        <div className="mt-6 border-t border-line pt-6">
          <div className="flex items-center gap-2 text-[13px] text-inkMuted mb-3">
            <ImageIcon className="h-4 w-4 text-accent" />
            <span>Images personnalisées (optionnel)</span>
          </div>
          
          <div className="flex items-center gap-2 mb-3">
            <button
              type="button"
              onClick={() => setActiveImageType('hero')}
              className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
                activeImageType === 'hero' ? 'bg-accent text-canvas' : 'bg-surface text-inkMuted hover:bg-line'
              }`}>
              Photo principale (Hero)
            </button>
            <button
              type="button"
              onClick={() => setActiveImageType('gallery')}
              className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
                activeImageType === 'gallery' ? 'bg-accent text-canvas' : 'bg-surface text-inkMuted hover:bg-line'
              }`}>
              Galerie / Produits
            </button>
          </div>

          <label className="inline-flex items-center gap-2 rounded-lg border-2 border-dashed border-line bg-surface px-4 py-6 cursor-pointer transition-colors hover:border-accent hover:bg-elevated">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="sr-only" />
            <div className="flex flex-col items-center gap-2 text-center">
              <ImageIcon className="h-8 w-8 text-inkMuted" />
              <span className="text-[14px] text-inkMuted">Cliquez ou glissez-déposez vos images ici</span>
              <span className="text-[12px] text-inkFaint">PNG, JPG, WebP · Max 5MB par image</span>
            </div>
          </label>

          {images.length > 0 && (
            <div className="mt-4">
              <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-inkFaint mb-2">
                Images ajoutées ({images.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {images.map((img) => (
                  <div key={img.id} className="relative group">
                    <img
                      src={img.dataUrl}
                      alt={img.name}
                      className="h-16 w-16 object-cover rounded-lg border border-line"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(img.id)}
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <XIcon className="h-3 w-3" />
                    </button>
                    <span className="absolute bottom-1 left-1 right-1 text-[10px] text-white bg-black/50 px-1 truncate">{img.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 border-t border-line pt-6">
            <div className="flex items-center gap-2 text-[13px] text-inkMuted mb-3">
              <MessageSquareIcon className="h-4 w-4 text-accent" />
              <span>WhatsApp pour les commandes (optionnel)</span>
            </div>
            <label className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-3 cursor-text transition-colors focus-within:border-accent">
              <MessageSquareIcon className="h-5 w-5 text-inkMuted" />
              <input
                type="tel"
                placeholder="+33 6 12 34 56 78 (format international)"
                value={whatsappNumber}
                onChange={(e) => setWhatsAppNumber(e.target.value)}
                className="bg-transparent border-none outline-none text-[14px] text-ink w-full min-w-0"
              />
            </label>
            <span className="text-[12px] text-inkFaint">Les boutons "Commander" / "Acheter" redirigeront vers WhatsApp avec le produit pré-rempli</span>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-inkFaint">
            Exemples de prompts
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {suggestions.map((suggestion) =>
            <button
              key={suggestion.label}
              type="button"
              onClick={() => setValue(suggestion.prompt)}
              className="rounded-full border border-line bg-surface px-3.5 py-2 text-[13px] text-inkMuted transition-colors duration-150 ease-out hover:border-inkFaint hover:text-ink">
              
                {suggestion.label}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>);

}