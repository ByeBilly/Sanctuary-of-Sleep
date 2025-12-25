import React, { useEffect } from 'react';

declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

const GoogleAnalytics: React.FC = () => {
    const measurementId = import.meta.env.VITE_GOOGLE_MEASUREMENT_ID;

    useEffect(() => {
        if (!measurementId) return;

        // Initialize dataLayer
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) {
            window.dataLayer.push(args);
        }
        gtag('js', new Date());
        gtag('config', measurementId);

        // Inject the script tag
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
        script.async = true;
        document.head.appendChild(script);

        return () => {
            // Cleanup if necessary, though usually GA scripts persist
            document.head.removeChild(script);
        };
    }, [measurementId]);

    return null; // This component is logical only, no UI
};

export default GoogleAnalytics;
