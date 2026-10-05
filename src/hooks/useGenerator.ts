import { useCallback, useEffect, useRef, useState } from 'react';
import { buildSite } from '../data/templates';
import { detectKind, deriveTitle, slugify } from '../utils/site';
import { buildShareUrl } from '../utils/share';
import type { Deployment, GenerationStatus } from '../types/generator';

const THINK_MS = 900;
const STREAM_MS = 5200;
const TICK_MS = 32;
const PREVIEW_THROTTLE_MS = 350;

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
}

const EMPTY_DEPLOYMENT: Deployment = { status: 'none', spaceName: '', url: '' };

export function useGenerator() {
  const [state, setState] = useState<GeneratorState>({
    prompt: '',
    status: 'idle',
    code: '',
    previewCode: '',
    title: '',
    deployment: EMPTY_DEPLOYMENT,
    progress: 0
  });

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
    (prompt: string) => {
      const trimmed = prompt.trim();
      if (!trimmed) return;
      clearAll();

      const kind = detectKind(trimmed);
      const title = deriveTitle(trimmed, kind);
      const full = buildSite(kind, title);

      setState({
        prompt: trimmed,
        status: 'thinking',
        code: '',
        previewCode: '',
        title,
        deployment: EMPTY_DEPLOYMENT,
        progress: 0
      });

      const start = window.setTimeout(() => {
        setState((prev) => ({ ...prev, status: 'streaming' }));
        const step = Math.max(24, Math.ceil(full.length / (STREAM_MS / TICK_MS)));
        let cursor = 0;
        let lastPreview = 0;

        interval.current = window.setInterval(() => {
          cursor = Math.min(full.length, cursor + step);
          const slice = full.slice(0, cursor);
          const now = Date.now();
          const refreshPreview = now - lastPreview > PREVIEW_THROTTLE_MS || cursor >= full.length;
          if (refreshPreview) lastPreview = now;

          setState((prev) => ({
            ...prev,
            code: slice,
            previewCode: refreshPreview ? slice : prev.previewCode,
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
          url: buildShareUrl(prev.code)
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
    setState({
      prompt: '',
      status: 'idle',
      code: '',
      previewCode: '',
      title: '',
      deployment: EMPTY_DEPLOYMENT,
      progress: 0
    });
  }, [clearAll]);

  const { code, ...restState } = state;
  return { ...restState, generate, deploy, reset };
}