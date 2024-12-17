import { ChangeDetectionStrategy, Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';

interface Module {
    title: string;
    description: string;
    image: string;
    animationClass: string;
    delay?: string;
}

@Component({
    selector: 'app-modules',
    templateUrl: './modules.component.html',
    styleUrls: ['./modules.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule]
})
export class ModulesComponent {
    private dataService = inject(DataService);
    protected modulesData = computed(() => this.dataService.modules());
}