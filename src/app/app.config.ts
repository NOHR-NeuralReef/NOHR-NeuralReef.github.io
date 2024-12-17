import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MarkdownModule } from 'ngx-markdown';
import { routes } from './app.routes';
import { DataService } from './services/data.service';

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withViewTransitions()),
        provideHttpClient(withFetch()),
        importProvidersFrom(
            NgbModule,
            MarkdownModule.forRoot()
        ),
        DataService
    ]
};

// App configuration constants
export const APP_CONSTANTS = {
    name: "Neural Reef - Personal AI Freedom",
    shortName: "Neural Reef",
    description: "Neural Reef - Ultra-secure, AI-driven smart home system that puts you in complete control of your data.",
    navigation: {
        links: ["Home", "About", "Quote", "Modules", "Article", "Contact"]
    }
};