import React from 'react';
import { MonitorIcon, SmartphoneIcon } from 'lucide-react';

export type Viewport = 'desktop' | 'mobile';

interface PreviewFrameProps {
  html: string;
  viewport: Viewport;
  onViewportChange: (viewport: Viewport) => void;
  label: string;
}

const VIEWPORTS: Array<{id: Viewport;icon: typeof MonitorIcon;label: string;}> = [
{ id: 'desktop', icon: MonitorIcon, label: 'Vue bureau' },
{ id: 'mobile', icon: SmartphoneIcon, label: 'Vue mobile' }];


export function PreviewFrame({ html, viewport, onViewportChange, label }: PreviewFrameProps) {
  return (
    <div className="flex h-full flex-col bg-canvas">
      <div className="flex items-center justify-between border-b border-lineSoft px-3 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
          </span>
          <span className="truncate rounded-md bg-elevated px-2.5 py-1 font-mono text-[11px] text-inkMuted">
            {label}
          </span>
        </div>
        <div className="flex items-center gap-0.5 rounded-lg bg-elevated p-0.5">
          {VIEWPORTS.map(({ id, icon: Icon, label: viewLabel }) =>
          <button
            key={id}
            type="button"
            onClick={() => onViewportChange(id)}
            aria-label={viewLabel}
            aria-pressed={viewport === id}
            className={`rounded-md p-1.5 transition-colors duration-150 ease-out ${
            viewport === id ? 'bg-line text-ink' : 'text-inkFaint hover:text-inkMuted'}`
            }>
            
              <Icon className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-1 justify-center overflow-hidden bg-[#0d0f13] p-4">
        <div
          className={`h-full overflow-hidden rounded-lg border border-line bg-white transition-[max-width] duration-200 ease-out ${
          viewport === 'mobile' ? 'w-full max-w-[390px]' : 'w-full'}`
          }>
          
          <iframe
            title="Aperçu du site généré"
            srcDoc={html}
            sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            className="h-full w-full border-0 bg-white" />
          
        </div>
      </div>
    </div>);

}