'use client';

import Script from 'next/script';

interface AnalyticsProps {
  googleAnalyticsId?: string;
}

export function Analytics({ googleAnalyticsId }: AnalyticsProps) {
  if (!googleAnalyticsId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${googleAnalyticsId}');
        `}
      </Script>
    </>
  );
}
