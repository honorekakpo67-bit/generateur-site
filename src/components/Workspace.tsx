import React, { useState } from 'react';
import {
  ArrowLeftIcon,
  EyeIcon,
  LayoutPanelLeftIcon,
  RefreshCwIcon,
  RocketIcon } from
'lucide-react';
import { PreviewFrame, type Viewport } from './PreviewFrame';
import { DeployBar } from './DeployBar';
import { PaymentModal } from './PaymentModal';
import { shortLabel } from '../utils/share';
import type { Deployment, GenerationStatus, SiteKind } from '../types/generator';

interface WorkspaceProps {
  prompt: string;
  title: string;
  status: GenerationStatus;
  previewCode: string;
  progress: number;
  deployment: Deployment;
  onDeploy: (transactionId: string) => void;
  onRegenerate: () => void;
  onReset: () => void;
}

type View = 'split' | 'preview';

const VIEWS: Array<{id: View;icon: typeof EyeIcon;label: string;desktopOnly?: boolean;}> = [
{ id: 'split', icon: LayoutPanelLeftIcon, label: 'Côte à côté', desktopOnly: true },
{ id: 'preview', icon: EyeIcon, label: 'Aperçu' }];


function statusLabel(status: GenerationStatus, progress: number): string {
  if (status === 'thinking') return 'DeepSeek-V3 analyse votre demande';
  if (status === 'streaming') return `Génération du code · ${Math.round(progress * 100)}%`;
  return 'Généré en une passe';
}

function getSiteKind(prompt: string): SiteKind {
  const value = prompt.toLowerCase();
  if (value.includes('portfolio') || value.includes('designer') || value.includes('photograph') || value.includes('freelance') || value.includes('cv') || value.includes('artist')) return 'portfolio';
  if (value.includes('shop') || value.includes('store') || value.includes('boutique') || value.includes('product') || value.includes('coffee') || value.includes('ecommerce') || value.includes('e-commerce') || value.includes('price list') || value.includes('menu')) return 'shop';
  if (value.includes('event') || value.includes('conference') || value.includes('meetup') || value.includes('festival') || value.includes('webinar') || value.includes('ticket') || value.includes('summit') || value.includes('workshop')) return 'event';
  return 'landing';
}

export function Workspace({
  prompt,
  title,
  status,
  previewCode,
  progress,
  deployment,
  onDeploy,
  onRegenerate,
  onReset
}: WorkspaceProps) {
  const [view, setView] = useState<View>('preview');
  const [viewport, setViewport] = useState<Viewport>('desktop');
  const [showPayment, setShowPayment] = useState(false);
  const isReady = status === 'ready';
  const siteKind = getSiteKind(prompt);

  const handleDeploy = () => {
    if (!isReady || deployment.status !== 'none') return;
    setShowPayment(true);
  };

  const handlePaymentSuccess = (transactionId: string) => {
    setShowPayment(false);
    onDeploy(transactionId);
  };

  const handlePaymentClose = () => {
    setShowPayment(false);
  };

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-canvas">
      <header className="flex flex-wrap items-center gap-x-4 gap-y-3 border-b border-line px-4 py-3">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[13px] text-inkMuted transition-colors duration-150 ease-out hover:bg-elevated hover:text-ink">
          
          <ArrowLeftIcon className="h-4 w-4" />
          Nouveau site
        </button>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-[14px] font-semibold text-ink">{title}</h1>
          <p className="truncate font-mono text-[11px] text-inkFaint">{prompt}</p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-1.5">
          <span
            className={`h-1.5 w-1.5 rounded-full ${isReady ? 'bg-accent' : 'animate-pulse bg-info'}`}
            aria-hidden="true" />
          
          <span className="text-[12px] text-inkMuted" role="status">
            {statusLabel(status, progress)}
          </span>
        </div>

        <div className="flex items-center gap-1 rounded-lg bg-elevated p-0.5">
          {VIEWS.map(({ id, icon: Icon, label, desktopOnly }) =>
          <button
            key={id}
            type="button"
            onClick={() => setView(id)}
            aria-pressed={view === id}
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[12.5px] transition-colors duration-150 ease-out ${
            view === id ? 'bg-line text-ink' : 'text-inkFaint hover:text-inkMuted'} ${
            desktopOnly ? 'hidden lg:inline-flex' : ''}`}>
            
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRegenerate}
            disabled={!isReady}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-[13px] text-inkMuted transition-colors duration-150 ease-out hover:border-inkFaint hover:text-ink disabled:cursor-not-allowed disabled:opacity-40">
            
            <RefreshCwIcon className="h-3.5 w-3.5" />
            Regénérer
          </button>
          <button
            type="button"
            onClick={handleDeploy}
            disabled={!isReady || deployment.status !== 'none'}
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-[13px] font-semibold text-canvas transition-[background-color,opacity] duration-150 ease-out hover:bg-accentDim disabled:cursor-not-allowed disabled:opacity-40">
            
            <RocketIcon className="h-3.5 w-3.5" />
            {deployment.status === 'none' ? 'Publier (5000 FCFA)' : deployment.status === 'live' ? 'En ligne' : 'Publication…'}
          </button>
        </div>
      </header>

      <DeployBar deployment={deployment} />

      <div className="flex min-h-0 flex-1">
        <div className="min-h-0 flex-1">
          <PreviewFrame
            html={previewCode}
            viewport={viewport}
            onViewportChange={setViewport}
            label={deployment.status === 'live' ? shortLabel(deployment.url) : 'aperçu local'} />
        </div>
      </div>

      <PaymentModal
        isOpen={showPayment}
        onClose={handlePaymentClose}
        onSuccess={handlePaymentSuccess}
        siteTitle={title}
        siteKind={siteKind}
      />
    </div>);
}