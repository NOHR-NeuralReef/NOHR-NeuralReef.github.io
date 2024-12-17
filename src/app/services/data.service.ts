import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
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
        const contact = this.data?.Contact;
        if (Array.isArray(contact)) {
            throw new Error('Contact data is in incorrect format');
        }
        return contact as Contact;
    }

    about() {
        const about = this.data?.About;
        if (Array.isArray(about)) {
            throw new Error('About data is in incorrect format'); 
        }
        return about as About;
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