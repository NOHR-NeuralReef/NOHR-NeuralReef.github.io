import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    template: `
        <!-- Splash Screen -->
        <div id="loader" class="splash-screen">
            <div id="splash" class="splash">
                <div class="splash-circle circle-1">
                    <div class="circle-animation"></div>
                </div>
                <div class="splash-circle circle-2">
                    <div class="circle-animation"></div>
                </div>
            </div>
            <div class="section-transition" id="section-left"></div>
            <div class="section-transition" id="section-right"></div>
        </div>

        <!-- Main Application Content -->
        <main>
            <router-outlet/>
        </main>
    `,
    styleUrls: ['./app.component.css'],
    host: { ngSkipHydration: 'true' }
})
export class AppComponent implements OnInit {
    ngOnInit(): void {
        this.setupCanonicalLink();
    }

    private setupCanonicalLink(): void {
        const link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        link.setAttribute('href', document.URL);
        document.head.appendChild(link);
    }
}
