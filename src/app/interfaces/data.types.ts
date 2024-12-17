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
}

// Add other interfaces as needed 
// Add other interfaces as needed 