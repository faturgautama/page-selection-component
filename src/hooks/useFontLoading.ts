import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if Montserrat font has loaded successfully
 * Returns true if font is loaded, false if fallback fonts should be used
 * 
 * This ensures the component remains functional even if the primary font fails to load
 */
export const useFontLoading = (): boolean => {
    const [fontLoaded, setFontLoaded] = useState<boolean>(false);

    useEffect(() => {
        // Check if document.fonts API is available
        if (!document.fonts) {
            // If Font Loading API is not supported, assume font is loaded
            // Component will use fallback fonts automatically via CSS
            // Using setTimeout to avoid direct setState in effect
            const timer = setTimeout(() => setFontLoaded(true), 0);
            return () => clearTimeout(timer);
        }

        // Check if Montserrat font is already loaded
        const checkFont = async () => {
            try {
                // Wait for Montserrat font to load (with 3 second timeout)
                await Promise.race([
                    document.fonts.load('400 14px Montserrat'),
                    new Promise((resolve) => setTimeout(resolve, 3000))
                ]);

                // Check if the font is actually available
                const fontAvailable = document.fonts.check('400 14px Montserrat');
                setFontLoaded(fontAvailable);

                if (!fontAvailable) {
                    console.warn('Montserrat font failed to load. Using fallback fonts.');
                }
            } catch (error) {
                console.warn('Error checking font loading:', error);
                // On error, assume font loaded to prevent blocking
                setFontLoaded(true);
            }
        };

        checkFont();

        // Listen for font loading events
        const handleFontsReady = () => {
            const fontAvailable = document.fonts.check('400 14px Montserrat');
            setFontLoaded(fontAvailable);
        };

        document.fonts.ready.then(handleFontsReady);

        return () => {
            // Cleanup if needed
        };
    }, []);

    return fontLoaded;
};
