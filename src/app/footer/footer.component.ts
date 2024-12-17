import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../services/data.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, NgbTooltipModule]
})
export class FooterComponent implements OnInit {
    private dataService = inject(DataService);
    protected footer = computed(() => this.dataService.footer());

    constructor(private changeDetectorRef: ChangeDetectorRef) {
        changeDetectorRef.detach();
    }

    ngOnInit(): void {
        this.changeDetectorRef.detectChanges();
    }
}