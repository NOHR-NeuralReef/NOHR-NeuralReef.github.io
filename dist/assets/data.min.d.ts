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
        NavTabs: Array<{
            id: string;
            name: string;
            placement: string;
        }>;
        image: string;
        aboutImage: string;
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
        roadmap: Array<{
            framework: string;
            launch_core: string;
            estimatedtime: string;
            percentage: string;
            textAlignment: string;
            animationClass: string;
        }>;
    };
    modules: Array<{
        title: string;
        description: string;
        image: string;
        animationClass: string;
    }>;
    contact: {
        cards: Array<{
            title: string;
            description: string;
        }>;
    };
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

export default data;

interface Window {
    data: typeof data;
} 