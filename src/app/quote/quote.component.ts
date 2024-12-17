import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';

interface QuoteData {
    quote: string;
    author: string;
}

@Component({
    selector: 'app-quote',
    templateUrl: './quote.component.html',
    styleUrls: ['./quote.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule]
})
export class QuoteComponent implements OnInit {
    private dataService = inject(DataService);
    protected quote = computed(() => this.dataService.quote());

    constructor(private changeDetectorRef: ChangeDetectorRef) {
        changeDetectorRef.detach();
    }

    ngOnInit(): void {
        this.changeDetectorRef.detectChanges();
    }
}