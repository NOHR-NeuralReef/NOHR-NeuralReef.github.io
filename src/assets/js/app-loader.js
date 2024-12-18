// Wait for both DOM and scripts to load
window.addEventListener('load', async () => {
    try {
        console.log('App loader started');
        // Check if we're running locally
        const isLocal = window.location.hostname === 'localhost';
        const baseUrl = isLocal ? '' : 'https://nohr.com';

        // Check if data is loaded
        if (!window.data) {
            console.error('Data not loaded!');
            return;
        }
        console.log('Data loaded:', window.data);
        console.log('Quote data:', window.data.Quote);
        console.log('Contact data:', window.data.contact);

        // Initialize particles
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: { 
                        value: 80,
                        density: { enable: true, value_area: 1000 }
                    },
                    color: { 
                        value: "#ff00aa"  // Pink color
                    },
                    shape: { 
                        type: "circle",
                        stroke: {
                            width: 2,
                            color: "#ff00aa"
                        }
                    },
                    opacity: {
                        value: 0.8,
                        random: false
                    },
                    size: {
                        value: 4,
                        random: true
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#ff00aa",  // Pink lines
                        opacity: 0.6,
                        width: 1,
                        shadow: {
                            enable: true,
                            color: "#ff00aa",
                            blur: 5
                        }
                    },
                    move: {
                        enable: true,
                        speed: 3,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "bounce",
                        bounce: true
                    }
                },
                interactivity: {
                    detect_on: "window",
                    events: {
                        onhover: {
                            enable: true,
                            mode: "grab"
                        },
                        onclick: {
                            enable: true,
                            mode: "push"
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 200,
                            line_linked: {
                                opacity: 0.8
                            }
                        },
                        push: {
                            particles_nb: 3
                        }
                    }
                },
                retina_detect: true
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