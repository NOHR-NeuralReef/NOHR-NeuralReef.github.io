import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Identity } from '../types/identity.types';
import { BehaviorSubject } from 'rxjs';

interface Article {
    title: string;
    subtitle: string;
    date: string;
    description: string;
    link: string;
    class: string;
}

interface ContactCard {
    title: string;
    description: string;
}

interface AppState {
    identity: Identity;
    NavBar: { name: string; image: string; links: string[] };
    Home: any;
    About: any;
    modules: any[];
    contact: {
        cards: ContactCard[];
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
    Articles: Article[];
}

@Injectable({ providedIn: 'root' })
export class DataService {
    private state = signal<AppState>({
        identity: { name: '', image: '' },
        NavBar: { name: '', image: '', links: [] },
        Home: {},
        About: {},
        modules: [],
        contact: {
            cards: []
        },
        Footer: {
            citation: {
                name: '',
                icon: ''
            }
        },
        Quote: {
            quote: '',
            author: ''
        },
        Articles: []
    });

    private readonly DEHYDRATED_DATA = (window as any).DEHYDRATED_DATA;

    private dataLoaded = new BehaviorSubject<boolean>(false);
    dataReady$ = this.dataLoaded.asObservable();

    // Computed values
    readonly identity = computed(() => this.state().identity);
    readonly navBar = computed(() => this.state().NavBar);
    readonly home = computed(() => this.state().Home);
    readonly about = computed(() => this.state().About);
    readonly modules = computed(() => this.state().modules);
    readonly contact = computed(() => this.state().contact?.cards ?? []);
    readonly footer = computed(() => this.state().Footer);
    readonly quote = computed(() => this.state().Quote);
    readonly articles = computed(() => this.state().Articles);

    constructor(private http: HttpClient) {
        // Initialize with dehydrated data if available
        if (this.DEHYDRATED_DATA) {
            console.log('Using dehydrated data');
            this.state.set(this.DEHYDRATED_DATA);
            this.dataLoaded.next(true);
        }
        
        // Still try to load fresh data
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeData());
        } else {
            this.initializeData();
        }
    }

    getData() {
        return this.state();
    }

    private async initializeData() {
        try {
            const data = (window as any).data;
            if (!data) {
                console.log('Using dehydrated data as fallback');
                if (this.DEHYDRATED_DATA) {
                    this.state.set(this.DEHYDRATED_DATA);
                    this.dataLoaded.next(true);
                    return;
                }
                console.error('Data is undefined');
                this.dataLoaded.next(false);
                return;
            }

            if (!this.validateData(data)) {
                console.error('Invalid data structure');
                console.log('Data validation failed:', {
                    hasIdentity: !!data?.identity,
                    hasNavBarLinks: !!data?.NavBar?.links,
                    hasModules: !!data?.modules,
                    hasFooter: !!data?.Footer,
                    hasQuote: !!data?.Quote,
                    hasContact: !!data?.contact?.cards
                });
                this.dataLoaded.next(false);
                return;
            }

            console.log('Setting data in service:', data);
            this.state.set(data);
            this.dataLoaded.next(true);
        } catch (error) {
            console.error('Error loading data:', error);
            // Use dehydrated data as fallback
            if (this.DEHYDRATED_DATA) {
                console.log('Using dehydrated data after error');
                this.state.set(this.DEHYDRATED_DATA);
                this.dataLoaded.next(true);
                return;
            }
            this.dataLoaded.next(false);
        }
    }

    private validateData(data: any): boolean {
        const isValid = !!(
            data.identity &&
            data.NavBar?.links &&
            data.modules &&
            data.Footer &&
            data.Quote &&
            data.contact?.cards
        );
        console.log('Data validation result:', isValid);
        return isValid;
    }

    // Public method to check if data is loaded
    isDataLoaded(): boolean {
        return this.dataLoaded.value;
    }
} 