/**
 * Utility to detect if CSS has loaded successfully
 * This helps identify when styles fail to load and fallback behavior is needed
 */

/**
 * Checks if a stylesheet has loaded successfully
 * @param href - The href of the stylesheet to check
 * @returns true if stylesheet is loaded, false otherwise
 */
export const isStylesheetLoaded = (href: string): boolean => {
    const stylesheets = Array.from(document.styleSheets);
    return stylesheets.some((sheet) => {
        try {
            return sheet.href && sheet.href.includes(href);
        } catch {
            // Cross-origin stylesheets may throw errors
            return false;
        }
    });
};

/**
 * Checks if any stylesheets have failed to load
 * @returns true if all stylesheets loaded successfully, false if any failed
 */
export const checkStylesheetsLoaded = (): boolean => {
    const linkElements = document.querySelectorAll('link[rel="stylesheet"]');

    if (linkElements.length === 0) {
        // No external stylesheets, consider as loaded
        return true;
    }

    let allLoaded = true;

    linkElements.forEach((link) => {
        const linkElement = link as HTMLLinkElement;

        // Check if the link element has loaded
        if (linkElement.sheet === null) {
            console.warn(`Stylesheet failed to load: ${linkElement.href}`);
            allLoaded = false;
        }
    });

    return allLoaded;
};

/**
 * Monitors stylesheet loading and calls callback when complete or on error
 * @param callback - Function to call with loading status
 * @param timeout - Timeout in milliseconds (default: 5000)
 */
export const monitorStylesheetLoading = (
    callback: (loaded: boolean) => void,
    timeout: number = 5000
): void => {
    const startTime = Date.now();

    const checkLoading = () => {
        const loaded = checkStylesheetsLoaded();
        const elapsed = Date.now() - startTime;

        if (loaded) {
            callback(true);
        } else if (elapsed >= timeout) {
            console.warn('Stylesheet loading timeout. Using fallback styles.');
            callback(false);
        } else {
            // Check again after a short delay
            setTimeout(checkLoading, 100);
        }
    };

    // Start checking after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkLoading);
    } else {
        checkLoading();
    }
};
