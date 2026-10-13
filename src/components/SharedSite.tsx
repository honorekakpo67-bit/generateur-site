import React from 'react';

interface SharedSiteProps {
  html: string;
}

export function SharedSite({ html }: SharedSiteProps) {
  return (
    <iframe
      title="Site publié"
      srcDoc={html}
      sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      className="h-full w-full border-0 bg-white" />);


}