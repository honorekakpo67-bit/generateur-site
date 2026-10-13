import { useCallback, useEffect, useRef, useState } from 'react';
import { buildSite } from '../data/templates';
import { detectKind, deriveTitle, slugify } from '../utils/site';
import { buildShareUrl } from '../utils/share';
import type { Deployment, GenerationStatus } from '../types/generator';

interface UploadedImage {
  id: string;
  name: string;
  dataUrl: string;
  type: 'hero' | 'gallery';
}

const THINK_MS = 900;
const STREAM_MS = 5200;
const TICK_MS = 32;

const DEPLOY_STEPS: Array<{status: Deployment['status'];delay: number;}> = [
{ status: 'packaging', delay: 400 },
{ status: 'uploading', delay: 500 },
{ status: 'booting', delay: 450 },
{ status: 'live', delay: 0 }];


interface GeneratorState {
  prompt: string;
  status: GenerationStatus;
  code: string;
  previewCode: string;
  title: string;
  deployment: Deployment;
  progress: number;
  images: UploadedImage[];
  whatsappNumber: string;
}

const EMPTY_DEPLOYMENT: Deployment = { status: 'none', spaceName: '', url: '' };

const EMPTY_STATE: GeneratorState = {
  prompt: '',
  status: 'idle',
  code: '',
  previewCode: '',
  title: '',
  deployment: EMPTY_DEPLOYMENT,
  progress: 0,
  images: [],
  whatsappNumber: ''
};

export function useGenerator() {
  const [state, setState] = useState<GeneratorState>(EMPTY_STATE);

  const timers = useRef<number[]>([]);
  const interval = useRef<number | null>(null);

  const clearAll = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
    if (interval.current !== null) {
      window.clearInterval(interval.current);
      interval.current = null;
    }
  }, []);

  useEffect(() => clearAll, [clearAll]);

  const generate = useCallback(
    (prompt: string, images: UploadedImage[] = [], whatsappNumber: string = '') => {
      const trimmed = prompt.trim();
      if (!trimmed) return;
      clearAll();

      const kind = detectKind(trimmed);
      const title = deriveTitle(trimmed, kind);
      const full = buildSite(kind, title, images, whatsappNumber);

      setState({
        prompt: trimmed,
        status: 'thinking',
        code: '',
        previewCode: full,
        title,
        deployment: EMPTY_DEPLOYMENT,
        progress: 0,
        images,
        whatsappNumber
      });

      const start = window.setTimeout(() => {
        setState((prev) => ({ ...prev, status: 'streaming' }));
        const step = Math.max(24, Math.ceil(full.length / (STREAM_MS / TICK_MS)));
        let cursor = 0;

        interval.current = window.setInterval(() => {
          cursor = Math.min(full.length, cursor + step);
          const slice = full.slice(0, cursor);

          setState((prev) => ({
            ...prev,
            code: slice,
            progress: cursor / full.length,
            status: cursor >= full.length ? 'ready' : 'streaming'
          }));

          if (cursor >= full.length && interval.current !== null) {
            window.clearInterval(interval.current);
            interval.current = null;
          }
        }, TICK_MS);
      }, THINK_MS);

      timers.current.push(start);
    },
    [clearAll]
  );

  const deploy = useCallback((_transactionId?: string) => {
    setState((prev) => {
      if (prev.status !== 'ready' || prev.deployment.status !== 'none') return prev;
      const slug = slugify(prev.title);
      return {
        ...prev,
        deployment: {
          status: 'packaging',
          spaceName: `deepsite-${slug}`,
          url: buildShareUrl(prev.previewCode)
        }
      };
    });

    let elapsed = 0;
    DEPLOY_STEPS.forEach(({ delay }, index) => {
      const next = DEPLOY_STEPS[index + 1];
      elapsed += delay;
      if (!next) return;
      const id = window.setTimeout(() => {
        setState((prev) => ({ ...prev, deployment: { ...prev.deployment, status: next.status } }));
      }, elapsed);
      timers.current.push(id);
    });
  }, []);

  const reset = useCallback(() => {
    clearAll();
    setState(EMPTY_STATE);
  }, [clearAll]);

  return { ...state, generate, deploy, reset };
}