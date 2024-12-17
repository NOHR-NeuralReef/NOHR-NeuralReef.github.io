import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticleModalComponent } from '../shared/article-modal/article-modal.component';
import { DataService } from '../services/data.service';
import { computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-articles',
    templateUrl: './articles.component.html',
    styleUrls: ['./articles.component.css'],
    standalone: true,
    imports: [CommonModule]
})
export class ArticlesComponent {
    private modalService = inject(NgbModal);
    private dataService = inject(DataService);

    articles = computed(() => this.dataService.articles());

    openArticle(article: any) {
        const modalRef = this.modalService.open(ArticleModalComponent, {
            ariaLabelledBy: 'modal-basic-title',
            backdrop: true,  // enables click outside to close
            keyboard: true,  // enables ESC key to close
            centered: true,
            scrollable: true,
            size: 'lg',
            modalDialogClass: 'article-modal-dialog',
            windowClass: 'article-modal-window'
        });
        
        modalRef.componentInstance.title = article.title;
        modalRef.componentInstance.markdownPath = `assets/articles/${article.link}.md`;
    }
} 