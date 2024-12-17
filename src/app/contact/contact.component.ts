import { Component, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
    private dataService = inject(DataService);
    protected contactData = computed(() => this.dataService.contact());

    ngOnInit() {
        console.log('Contact component initialized');
        console.log('Contact data:', this.contactData());
    }
}