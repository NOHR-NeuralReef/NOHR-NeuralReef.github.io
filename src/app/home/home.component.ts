import { Component, OnInit, inject, AfterViewInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../services/data.service';

// Add window interface at the top of the file
declare global {
    interface Window {
        particlesJS: any;
    }
}

// Declare Typed.js and particles
declare var Typed: any;

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, NgbTooltipModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
    private dataService = inject(DataService);
    protected homeData = computed(() => this.dataService.home());

    ngOnInit(): void {
        // Any initialization logic
    }

    ngAfterViewInit(): void {
        // Wait for scripts to load
        const initParticles = () => {
            if (typeof window.particlesJS === 'function') {
                window.particlesJS('particles-js', {
                    particles: {
                        number: { 
                            value: 80,
                            density: { enable: true, value_area: 1000 }
                        },
                        color: { 
                            value: ["#ff00aa", "#ff1ab3", "#ff33bb"]
                        },
                        shape: { 
                            type: "circle",
                            stroke: {
                                width: 0,
                                color: "#ff00aa"
                            }
                        },
                        opacity: {
                            value: 0.8,
                            random: false,
                            anim: {
                                enable: false,
                                speed: 1,
                                opacity_min: 0.1,
                                sync: false
                            }
                        },
                        size: {
                            value: 3,
                            random: true,
                            anim: {
                                enable: false,
                                speed: 40,
                                size_min: 0.1,
                                sync: false
                            }
                        },
                        line_linked: {
                            enable: true,
                            distance: 150,
                            color: "#ff00aa",
                            opacity: 0.6,
                            width: 1,
                            color_rgb_line: {
                                r: 255,
                                g: 0,
                                b: 170
                            }
                        },
                        move: {
                            enable: true,
                            speed: 3,
                            direction: "none",
                            random: true,
                            straight: false,
                            out_mode: "bounce",
                            bounce: true,
                            attract: {
                                enable: false,
                                rotateX: 600,
                                rotateY: 1200
                            }
                        }
                    },
                    interactivity: {
                        detect_on: "window",
                        events: {
                            onhover: {
                                enable: true,
                                mode: "grab"
                            },
                            onclick: {
                                enable: true,
                                mode: "push"
                            },
                            resize: true
                        },
                        modes: {
                            grab: {
                                distance: 200,
                                line_linked: {
                                    opacity: 0.8
                                }
                            },
                            push: {
                                particles_nb: 3
                            }
                        }
                    },
                    retina_detect: true,
                    fps_limit: 60
                } as any);
            } else {
                setTimeout(initParticles, 100);
            }
        };

        initParticles();

        if (this.homeData() && this.homeData().typedElement) {
            const options = {
                stringsElement: '#typed-strings',
                typeSpeed: 50,
                backSpeed: 50,
                loop: true,
                showCursor: true,
                cursorChar: '|'
            };

            const typed = new Typed('#element', options);
        }
    }
}