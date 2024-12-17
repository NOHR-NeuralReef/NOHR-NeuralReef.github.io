import { Identity } from '../app/types/identity.types';

interface NavTab {
    id: string;
    name: string;
    placement: string;
}

interface Progress {
    name: string;
    value: number;
}

interface RoadmapItem {
    framework: string;
    launch_core: string;
    estimatedtime: string;
    percentage: string;
    textAlignment: string;
    animationClass: string;
}

interface Module {
    description: string;
    image: string;
    animationClass: string;
}

declare const data: {
    identity: {
        name: string;
        image: string;
    };
    NavBar: {
        name: string;
        image: string;
        links: string[];
    };
    About: {
        NavTabs: NavTab[];
        image: string;
        name: string;
        about: string;
        vision: Array<{
            title: string;
            description: string;
        }>;
        progresss: Array<Array<{
            name: string;
            value: number;
            description: string;
        }>>;
        roadmap: RoadmapItem[];
    };
    modules: Module[];
    Contact: any[];
    Footer: {
        citation: {
            name: string;
            icon: string;
        }
    };
    Quote: {
        quote: string;
        author: string;
    };
    Articles: any[];
};

export type AppData = typeof data; 