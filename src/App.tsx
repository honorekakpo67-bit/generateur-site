import React, { useEffect, useState } from 'react';
import { PromptComposer } from './components/PromptComposer';
import { Workspace } from './components/Workspace';
import { SharedSite } from './components/SharedSite';
import { useGenerator } from './hooks/useGenerator';
import { readSharedSite } from './utils/share';

export function App() {
  const generator = useGenerator();
  const [sharedHtml, setSharedHtml] = useState<string | null>(() => readSharedSite());
  const [paymentSuccess, setPaymentSuccess] = useState<string | null>(null);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash.startsWith('site=')) {
        setSharedHtml(readSharedSite());
        setPaymentSuccess(null);
      } else if (hash.startsWith('payment-success')) {
        const params = new URLSearchParams(hash.split('?')[1] || '');
        const tid = params.get('tid') || params.get('transactionId');
        if (tid) setPaymentSuccess(tid);
      } else if (hash.startsWith('payment-cancel') || hash.startsWith('test-payment')) {
        // payment cancelled, just close modal
      }
    };
    window.addEventListener('hashchange', onHashChange);
    onHashChange();
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    if (paymentSuccess && generator.status === 'ready') {
      generator.deploy(paymentSuccess);
      setPaymentSuccess(null);
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [paymentSuccess, generator]);

  if (sharedHtml) {
    return (
      <div className="h-full w-full bg-white">
        <SharedSite html={sharedHtml} />
      </div>);
  }

  return (
    <div className="h-full w-full overflow-hidden bg-canvas font-sans">
      {generator.status === 'idle' ?
      <div className="scroll-thin h-full overflow-auto">
          <PromptComposer onGenerate={generator.generate} />
        </div> :

      <Workspace
        prompt={generator.prompt}
        title={generator.title}
        status={generator.status}
        previewCode={generator.previewCode}
        progress={generator.progress}
        deployment={generator.deployment}
        onDeploy={generator.deploy}
        onRegenerate={() => generator.generate(generator.prompt)}
        onReset={generator.reset} />
      }
    </div>);
}