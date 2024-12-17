import { Component, OnInit, AfterViewInit, ChangeDetectorRef, HostListener, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../services/data.service';

interface AboutData {
    NavTabs: Array<{
        id: string;
        name: string;
        placement: string;
    }>;
    image: string;
    name: string;
    about: {
        vision: string;
        values: string[];
    };
    progresss: Array<Array<{
        name: string;
        value: number;
    }>>;
    roadmap: Array<{
        framework: string;
        launch_core: string;
        estimatedtime: string;
        percentage: string;
        textAlignment: string;
        animationClass: string;
    }>;
}

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, NgbTooltipModule]
})
export class AboutComponent implements OnInit, AfterViewInit {
    private dataService = inject(DataService);
    protected aboutData = computed(() => this.dataService.about());
    protected modules = computed(() => this.dataService.modules());
    public activeTab = 'about';
    public selector: HTMLElement | null = null;
    public activeElements: { [key: string]: HTMLElement } = {};
    public isExpanded = false;
    public readonly PREVIEW_LENGTH = 500; // Number of characters to show initially

    constructor(private changeDetectorRef: ChangeDetectorRef) {
        changeDetectorRef.detach();
    }

    ngOnInit(): void {
        this.changeDetectorRef.detectChanges();
        this.updateSelector(this.activeTab);
    }

    ngAfterViewInit(): void {
        this.initializeTabElements();
        this.changeActiveTab(this.activeTab);
    }

    public changeActiveTab(tab: string): void {
        this.updateSelector(tab);
        this.activeTab = tab;
        this.changeDetectorRef.detectChanges();
    }

    private initializeTabElements(): void {
        if (this.aboutData() && this.aboutData().NavTabs) {
            for (const tab of this.aboutData().NavTabs) {
                const element = document.getElementById(`${tab.id}-tab`);
                if (element) {
                    this.activeElements[tab.id] = element;
                    element.addEventListener('click', (event) => event.preventDefault());
                }
            }
        }
    }

    private updateSelector(tab: string): void {
        if (!this.selector) {
            this.selector = document.getElementById('selector');
        }
        
        if (this.selector && this.activeElements[tab]) {
            this.selector.style.width = `${this.activeElements[tab].offsetWidth}px`;
            this.selector.style.left = `${this.activeElements[tab].offsetLeft}px`;
        }
    }

    @HostListener('window:resize')
    onWindowResize(): void {
        this.updateSelector(this.activeTab);
    }

    getAboutText() {
        const fullText = this.aboutData().about;
        if (!this.isExpanded) {
            const preview = fullText.substring(0, this.PREVIEW_LENGTH);
            return preview + (fullText.length > this.PREVIEW_LENGTH ? '...' : '');
        }
        return fullText;
    }

    toggleExpand() {
        this.isExpanded = !this.isExpanded;
        this.changeDetectorRef.detectChanges();
    }
}