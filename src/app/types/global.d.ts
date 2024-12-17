import { Identity } from './identity.types';

declare global {
    interface Window {
        particlesJS: {
            load: (elementId: string, config?: any) => void;
        };
        data: {
            identity: {
                name: string;
                image: string;
            };
            NavBar: {
                name: string;
                image: string;
                links: string[];
            };
            Home: any;
            About: any;
            modules: any[];
            Contact: any[];
            Footer: {
                citation: {
                    name: string;
                    icon: string;
                    link?: string;
                }
            };
            Quote: {
                quote: string;
                author: string;
            };
            Articles: Array<{
                title: string;
                subtitle: string;
                date: string;
                description: string;
                link: string;
                class: string;
            }>;
        };
        Typed: any;
        pJS?: any;
        dataLoaded?: boolean;
    }
}

export {}; 