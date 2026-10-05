import React, { useState } from 'react';
import { ArrowUpIcon, SparklesIcon } from 'lucide-react';
import { suggestions } from '../data/suggestions';

interface PromptComposerProps {
  onGenerate: (prompt: string) => void;
}

export function PromptComposer({ onGenerate }: PromptComposerProps) {
  const [value, setValue] = useState('');
  const canSubmit = value.trim().length > 3;

  const submit = () => {
    if (canSubmit) onGenerate(value);
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
              <span className="font-mono text-[11px] text-inkFaint">HTML · CSS · JS en un fichier</span>
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