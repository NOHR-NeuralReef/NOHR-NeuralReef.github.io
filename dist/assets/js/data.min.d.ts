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

export default data; 