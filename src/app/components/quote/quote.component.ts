@Component({
    selector: 'app-quote',
    template: `
        <div *ngIf="quote$ | async as quote">
            <p>{{quote.text}}</p>
            <cite>{{quote.author}}</cite>
        </div>
    `
})
export class QuoteComponent {
    quote$ = this.dataService.quote();
    constructor(private dataService: DataService) {}
} 