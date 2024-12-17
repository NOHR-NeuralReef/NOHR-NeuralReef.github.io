import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Quote, Contact, About } from '../interfaces/data.types';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private readonly data = window.data;
    private dataReadySubject = new BehaviorSubject<boolean>(!!window.data);
    dataReady$ = this.dataReadySubject.asObservable();

    constructor() {
        console.log('Data service initialized with:', this.data);
    }

    quote() {
        return this.data?.Quote as Quote;
    }

    contact() {
        return this.data?.contact as Contact;
    }

    about() {
        return this.data?.About as About;
    }

    modules() {
        return this.data?.modules;
    }

    articles() {
        return this.data?.Articles;
    }

    footer() {
        return this.data?.Footer;
    }

    home() {
        return this.data?.Home;
    }

    identity() {
        return this.data?.identity;
    }

    navBar() {
        return this.data?.NavBar;
    }
} 