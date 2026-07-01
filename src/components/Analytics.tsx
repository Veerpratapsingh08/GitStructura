"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export function Analytics() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    // Check initial consent status
    const consent = localStorage.getItem('gitstructura-cookie-consent');
    if (consent === 'true') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHasConsent(true);
    }
    
    // Listen for custom event from CookieConsent banner
    const handleConsent = () => setHasConsent(true);
    window.addEventListener('cookie-consent-granted', handleConsent);
    
    return () => window.removeEventListener('cookie-consent-granted', handleConsent);
  }, []);

  if (!hasConsent) return null;

  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
  if (!clarityId) return null;

  return (
    <Script 
      id="clarity-script" 
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityId}");
        `
      }}
    />
  );
}
