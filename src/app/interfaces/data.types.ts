export interface Quote {
    quote: string;
    author: string;
}

export interface Contact {
    cards: Array<{
        title: string;
        description: string;
    }>;
}

export interface About {
    NavTabs: Array<{
        id: string;
        name: string;
        placement: string;
    }>;
    about: string;
    aboutImage: string;
    name: string;
    progresss: any[][];
    roadmap: any[];
    vision: any[];
}

// Add other interfaces as needed 