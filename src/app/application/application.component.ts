import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ModulesComponent } from '../modules/modules.component';
import { QuoteComponent } from '../quote/quote.component';
import { ArticlesComponent } from '../articles/articles.component';
import { ContactComponent } from '../contact/contact.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
    selector: 'app-application',
    templateUrl: './application.component.html',
    styleUrls: ['./application.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        NavbarComponent,
        HomeComponent,
        AboutComponent,
        ModulesComponent,
        QuoteComponent,
        ArticlesComponent,
        ContactComponent,
        FooterComponent
    ]
})
export class ApplicationComponent {}