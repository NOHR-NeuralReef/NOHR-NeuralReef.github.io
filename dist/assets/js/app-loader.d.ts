interface DataService {
    dataLoaded: { value: boolean };
}

interface NgContext {
    get(type: any): any;
}

interface AppRoot extends HTMLElement {
    __ngContext__?: NgContext;
}

declare global {
    interface Window {
        data: any;
        WOW: any;
    }
} 