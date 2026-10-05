import React, { useEffect, useState } from 'react';
import { PromptComposer } from './components/PromptComposer';
import { Workspace } from './components/Workspace';
import { SharedSite } from './components/SharedSite';
import { useGenerator } from './hooks/useGenerator';
import { readSharedSite } from './utils/share';

export function App() {
  const generator = useGenerator();
  const [sharedHtml, setSharedHtml] = useState<string | null>(() => readSharedSite());

  useEffect(() => {
    const onHashChange = () => setSharedHtml(readSharedSite());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

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