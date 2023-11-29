import React, { useEffect } from 'react';
export const HubspotCTA = () => {
  useEffect(() => {
    const iframe = document.querySelector('iframe.go812842568') as HTMLIFrameElement;
    if (iframe) {
      console.log('iframe', iframe);

      iframe.onload = () => {
        if (iframe.contentWindow) {
          console.log('iframe.contentWindow', iframe.contentWindow);

          const iframeWindow = iframe.contentWindow.document.getElementById('id_color');
          console.log('iframeWindow', iframeWindow);
        }
      };
    }
  }, []);
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//js.hs-scripts.com/43899841.js';
    script.async = true;
    script.defer = true;
    script.id = 'hs-script-loader';
    document.body.appendChild(script);
  }, []);
  return (
    <>
      <div
        className="hs-cta-embed hs-cta-embed-147691166006"
        style={{ maxWidth: '100%', maxHeight: '100%', width: '270px', height: '578.0390625px' }}
        data-hubspot-wrapper-cta-id="147691166006"
      >
        <div className="hs-cta-loading-dot__container">
          <div className="hs-cta-loading-dot"></div>
          <div className="hs-cta-loading-dot"></div>
          <div className="hs-cta-loading-dot"></div>
        </div>
        <div className="hs-cta-embed__skeleton"></div>
        <picture>
          <source
            srcSet="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
            media="(max-width: 480px)"
          />
          <img
            alt="Form CTA"
            loading="lazy"
            src="https://no-cache.hubspot.com/cta/default/43899841/interactive-147691166006.png"
            style={{ height: '100%', width: '100%', objectFit: 'fill' }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </picture>
      </div>
    </>
  );
};
