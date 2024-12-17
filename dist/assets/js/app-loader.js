// Wait for both DOM and scripts to load
window.addEventListener('load', async () => {
    try {
        console.log('App loader started');
        // Get base href from the DOM
        const baseHref = document.querySelector('base').getAttribute('href') || '/';
        console.log('Base href:', baseHref);
        
        // Initialize particles
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                // your particles config
            });
        } else {
            console.error('particlesJS not loaded');
        }

        // Initialize WOW
        if (typeof WOW !== 'undefined') {
            new WOW().init();
        } else {
            console.error('WOW not loaded');
        }

        // Listen for data loaded event first
        window.addEventListener('dataLoaded', (event) => {
            window.dataLoaded = event.detail;
        });

        // Force close splash after 8 seconds
        setTimeout(() => {
            const loader = document.getElementById('loader');
            if (loader) {
                console.log('Force closing splash screen after 8 seconds');
                loader.style.opacity = '0';
                const leftSection = document.getElementById('section-left');
                const rightSection = document.getElementById('section-right');
                if (leftSection) leftSection.style.transform = 'translateX(-100%)';
                if (rightSection) rightSection.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    loader.remove();
                }, 500);
            }
        }, 8000);

        let attempts = 0;
        const maxAttempts = 50;
        
        // Check for Angular and data readiness
        const checkReady = setInterval(() => {
            const appRoot = document.querySelector('app-root');
            const hasAngularState = appRoot?.getAttribute('ng-version');
            const dataReady = window.dataLoaded;
            const particlesContainer = document.getElementById('particles-js');

            attempts++;
            
            if ((appRoot?.children?.length > 0 && hasAngularState && dataReady) || attempts >= maxAttempts) {
                clearInterval(checkReady);
                const loader = document.getElementById('loader');
                const leftSection = document.getElementById('section-left');
                const rightSection = document.getElementById('section-right');

                if (loader) {
                    loader.style.opacity = '0';
                    if (leftSection) leftSection.style.transform = 'translateX(-100%)';
                    if (rightSection) rightSection.style.transform = 'translateX(100%)';
                    
                    setTimeout(() => {
                        loader.remove();
                        // Force set data loaded if not already set
                        if (!window.dataLoaded) {
                            window.dataLoaded = true;
                            window.dispatchEvent(new CustomEvent('dataLoaded', { detail: true }));
                        }
                    }, 500);
                }
            }
        }, 100);

        // Check if this file has any particle configurations that might override ours
    } catch (error) {
        console.error('Error in app-loader:', error);
    }
}); 