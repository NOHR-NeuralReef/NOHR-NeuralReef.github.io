import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MarkdownModule } from 'ngx-markdown';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-article-modal',
    standalone: true,
    imports: [CommonModule, MarkdownModule],
    template: `
        <div class="modal-header">
            <h4 class="modal-title">{{title}}</h4>
            <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss()"></button>
        </div>
        <div class="modal-body">
            <markdown [src]="markdownPath"></markdown>
        </div>
    `,
    styles: [`
        :host {
            display: block;
            color: white;
        }
        
        .modal-header {
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding: 1.5rem;
        }
        
        .modal-title {
            color: #ff00aa;
            font-family: 'Michroma', sans-serif;
            font-size: 1.5rem;
        }
        
        .modal-body {
            padding: 2rem;
            max-height: 70vh;
            overflow-y: auto;
            scrollbar-width: thin;
            scrollbar-color: #ff00aa rgba(255, 255, 255, 0.1);
        }
        
        .modal-body::-webkit-scrollbar {
            width: 6px;
        }
        
        .modal-body::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
        }
        
        .modal-body::-webkit-scrollbar-thumb {
            background: #ff00aa;
            border-radius: 3px;
        }
        
        .modal-body::-webkit-scrollbar-thumb:hover {
            background: #ff33bb;
        }
        
        .modal-content {
            scrollbar-width: none;
            -ms-overflow-style: none;
        }
        
        .modal-content::-webkit-scrollbar {
            display: none;
        }
        
        .btn-close {
            background: none;
            color: white;
            font-size: 1.5rem;
            opacity: 0.8;
            transition: opacity 0.2s;
        }
        
        .btn-close:hover {
            opacity: 1;
        }
        
        ::ng-deep markdown {
            color: white;
        }
    `]
})
export class ArticleModalComponent {
    @Input() title!: string;
    @Input() markdownPath!: string;

    constructor(public activeModal: NgbActiveModal) {}
} 