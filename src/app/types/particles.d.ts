interface ParticlesConfig {
    particles: {
        number: { value: number; density: { enable: boolean; value_area: number } };
        color: { value: string };
        shape: { type: string };
        opacity: { value: number; random: boolean };
        size: { value: number; random: boolean };
        line_linked: { 
            enable: boolean;
            distance: number;
            color: string;
            opacity: number;
            width: number;
        };
        move: {
            enable: boolean;
            speed: number;
            direction: string;
            random: boolean;
            straight: boolean;
            out_mode: string;
            bounce: boolean;
        };
    };
}

declare function particlesJS(elementId: string, config: ParticlesConfig): void; 
declare var particlesJS: any;
declare var WOW: any;