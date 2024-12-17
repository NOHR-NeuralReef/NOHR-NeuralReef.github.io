import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit, AfterViewInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbTooltipModule, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { SocialComponent } from '../social/social.component';
import { DataService } from '../services/data.service';

declare var particlesJS: any;

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, NgbTooltipModule, SocialComponent]
})
export class NavbarComponent implements OnInit, AfterViewInit {
    private dataService = inject(DataService);
    
    protected readonly identity = computed(() => this.dataService.identity());
    protected readonly navbar = computed(() => this.dataService.navBar());
    
    public activeClass = 'Home';
    public navbarProfileVisibility = false;
    public sticky = false;
    public animation = '';

    private offset: number[] = [];
    private offsetLink: string[] = [];
    private size = 0;
    private firstScroll = true;
    private firstClick = true;

    constructor(private changeDetectorRef: ChangeDetectorRef) {}

    ngOnInit(): void {
        this.initializeNavLinks();
        this.setupEscapeKeyListener();
        this.initializeParticles();
    }

    ngAfterViewInit(): void {
        this.setupNavTabListeners();
    }

    private initializeNavLinks(): void {
        for (const link of this.navbar().links) {
            this.offsetLink.push(link);
            this.offset.push(0);
            this.size++;
        }
    }

    private setupEscapeKeyListener(): void {
        window.addEventListener('keydown', (event) => {
            if (event.code === 'Escape' && this.navbarProfileVisibility) {
                this.removeProfile();
            }
        });
    }

    private setupNavTabListeners(): void {
        const navTabs: NodeListOf<Element> = document.querySelectorAll('.nav-link a');
        navTabs.forEach(navTab => {
            navTab.addEventListener('click', (event: Event) => event.preventDefault());
        });
    }

    private binarySearch(target: number): number {
        let low = 0;
        let high = this.offset.length - 1;

        if (target <= this.offset[low]) return 0;
        if (target >= this.offset[high]) return high;

        let res = 0;
        while (low < high) {
            const mid = Math.floor((low + high) / 2);
            if (target < this.offset[mid]) {
                high = mid;
            } else {
                res = mid;
                low = mid + 1;
            }
        }
        return res;
    }

    @HostListener('window:scroll')
    onWindowScroll(): void {
        if (this.firstScroll) {
            this.updateOffsetLink();
            this.firstScroll = false;
        }
        const scroll = window.scrollY + 10;
        this.sticky = scroll + 50 >= window.innerHeight;
        const index = this.binarySearch(scroll);
        this.activeClass = this.offsetLink[index];
    }

    @HostListener('window:resize')
    onResize(): void {
        this.firstClick = true;
        this.firstScroll = true;
        if (window.innerWidth >= 992 && this.navbarProfileVisibility) {
            this.navbarProfileVisibility = false;
        }
    }

    public scrollTo(target: number, duration = 1500, element = document.scrollingElement): void {
        if (!element || element.scrollTop === target) return;

        const cosParameter = (element.scrollTop - target) / 2;
        let scrollCount = 0;
        let oldTimestamp: number | null = null;

        const step = (newTimestamp: number) => {
            if (oldTimestamp !== null) {
                scrollCount += Math.PI * (newTimestamp - oldTimestamp) / duration;
                if (scrollCount >= Math.PI) {
                    element.scrollTop = target;
                    return;
                }
                element.scrollTop = cosParameter + target + cosParameter * Math.cos(scrollCount);
            }
            oldTimestamp = newTimestamp;
            window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
    }

    public updateActiveLink(navLink: string): void {
        if (this.firstClick) {
            this.updateOffsetLink();
            this.firstClick = false;
        }
        this.activeClass = navLink;
        
        const delay = this.navbarProfileVisibility ? 900 : 0;
        if (this.navbarProfileVisibility) {
            this.removeProfile();
        }

        setTimeout(() => {
            const element = document.getElementById(navLink.toLowerCase());
            if (element) {
                this.scrollTo(element.offsetTop);
            }
        }, delay);
    }

    public updateOffsetLink(): void {
        this.navbar().links.forEach((link, index) => {
            const element = document.getElementById(link.toLowerCase());
            if (element) {
                this.offset[index] = element.offsetTop;
            }
        });
    }

    public removeProfile(): void {
        this.animation = 'slideOutRight 1s forwards';
        this.changeDetectorRef.detectChanges();
        
        setTimeout(() => {
            this.navbarProfileVisibility = false;
            if (this.animation === 'slideOutRight 1s forwards') {
                this.animation = '';
                this.changeDetectorRef.detectChanges();
            }
        }, 1000);
    }

    public addProfile(): void {
        this.navbarProfileVisibility = true;
        this.animation = 'slideInLeft 1s forwards';
    }

    private initializeParticles(): void {
        setTimeout(() => {
            if (typeof particlesJS !== 'undefined') {
                try {
                    particlesJS('particles-js', {
                        particles: {
                            number: { value: 80, density: { enable: true, value_area: 800 } },
                            color: { value: "#ffffff" },
                            shape: { type: "circle" },
                            opacity: { value: 0.5, random: false },
                            size: { value: 3, random: true },
                            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
                            move: { enable: true, speed: 6, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
                        }
                    });
                } catch (error) {
                    console.error('Error initializing particles:', error);
                }
            }
        }, 500);
    }
}