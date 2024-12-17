import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Add polyfills
import '@angular/localize/init';

bootstrapApplication(AppComponent, appConfig)
	.catch(err => console.error('Error bootstrapping app:', err));
