
import { Component } from '@angular/core';
import { AdminGenericCrudComponent } from '../admin-generic-crud/admin-generic-crud.component';

@Component({
    selector: 'app-admin-news',
    standalone: true,
    imports: [AdminGenericCrudComponent],
    template: `<app-admin-generic-crud [title]="'News'" [data]="newsItems" [columns]="columns"></app-admin-generic-crud>`
})
export class AdminNewsComponent {
    newsItems = [
        { title: 'NEET 2026 application dates announced', category: 'Exam Updates', date: 'Jan 16, 2026' },
        { title: 'New medical college opens in Bangalore', category: 'Infrastructure', date: 'Jan 14, 2026' },
    ];

    columns = [
        { key: 'title', header: 'Headline' },
        { key: 'category', header: 'Category' },
        { key: 'date', header: 'Published On' }
    ];
}

