import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from "@angular/service-worker";
import { AppRoutingModule } from "./app-routing.module";
import { environment } from "../environments/environment";
import { appConfig } from './app.config';
import { DataService } from './services/data.service';

@NgModule({
    declarations: [],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            registrationStrategy: 'registerImmediately'
        })
    ],
    providers: [
        DataService,
        {
            provide: 'APP_CONFIG',
            useValue: appConfig    
        }
    ]
})
export class AppModule { }