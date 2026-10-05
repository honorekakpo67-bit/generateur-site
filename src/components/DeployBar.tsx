import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, CopyIcon, ExternalLinkIcon, GlobeIcon, Loader2Icon, BadgeCheckIcon } from 'lucide-react';
import { shortLabel } from '../utils/share';
import type { Deployment, DeployStatus } from '../types/generator';

interface DeployBarProps {
  deployment: Deployment;
}

const STEP_LABELS: Record<Exclude<DeployStatus, 'none' | 'live'>, string> = {
  packaging: 'Empaquetage du site',
  uploading: 'Envoi vers l\'hébergement',
  booting: 'Mise en ligne'
};

const ORDER: DeployStatus[] = ['packaging', 'uploading', 'booting', 'live'];

export function DeployBar({ deployment }: DeployBarProps) {
  const [copied, setCopied] = useState(false);

  if (deployment.status === 'none') return null;

  const isLive = deployment.status === 'live';
  const currentIndex = ORDER.indexOf(deployment.status);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(deployment.url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
      aria-live="polite"
      className={`flex flex-wrap items-center gap-x-4 gap-y-3 border-b px-5 py-3 ${
      isLive ? 'border-accent/25 bg-accent/[0.07]' : 'border-lineSoft bg-surface'}`
      }>
      
      {isLive ?
      <GlobeIcon className="h-4 w-4 shrink-0 text-accent" /> :

      <Loader2Icon className="h-4 w-4 shrink-0 animate-spin text-inkMuted" />
      }

      {isLive ?
      <>
          <div className="min-w-0 flex items-center gap-2">
            <p className="text-[14px] font-semibold text-ink">Votre site est en ligne</p>
            <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent">
              <BadgeCheckIcon className="h-3 w-3" />
              Payé 5000 FCFA
            </span>
          </div>
          <a
          href={deployment.url}
          target="_blank"
          rel="noreferrer"
          className="block truncate font-mono text-[12.5px] text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-150 ease-out hover:decoration-accent flex-1 min-w-0">
          
            {shortLabel(deployment.url)}
          </a>
          <div className="ml-auto flex items-center gap-2">
            <button
            type="button"
            onClick={copy}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-[13px] text-inkMuted transition-colors duration-150 ease-out hover:border-inkFaint hover:text-ink">
            
              {copied ? <CheckIcon className="h-3.5 w-3.5 text-accent" /> : <CopyIcon className="h-3.5 w-3.5" />}
              {copied ? 'Copié' : 'Copier'}
            </button>
            <a
            href={deployment.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-[13px] font-semibold text-canvas transition-colors duration-150 ease-out hover:bg-accentDim">
            
              Ouvrir
              <ExternalLinkIcon className="h-3.5 w-3.5" />
            </a>
          </div>
          <p className="basis-full text-[12px] leading-relaxed text-inkFaint">
            Le site entier voyage dans le lien : il s'ouvre partout, sans compte ni serveur.
          </p>
        </> :

      <>
          <p className="text-[14px] text-ink">
            {STEP_LABELS[deployment.status as Exclude<DeployStatus, 'none' | 'live'>]}…
          </p>
          <span className="font-mono text-[12px] text-inkFaint">{deployment.spaceName}</span>
          <div className="ml-auto flex items-center gap-1.5" aria-hidden="true">
            {ORDER.slice(0, 3).map((step, index) =>
          <span
            key={step}
            className={`h-1 w-8 rounded-full transition-colors duration-200 ease-out ${
            index <= currentIndex ? 'bg-accent' : 'bg-line'}`
            } />
 
          )}
          </div>
        </>
      }
    </motion.section>);
}