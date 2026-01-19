import { Component } from '@angular/core';
import { AdminGenericCrudComponent } from '../admin-generic-crud/admin-generic-crud.component';

@Component({
    selector: 'app-admin-blog',
    standalone: true,
    imports: [AdminGenericCrudComponent],
    template: `<app-admin-generic-crud [title]="'Blog'" [data]="blogPosts" [columns]="columns"></app-admin-generic-crud>`
})
export class AdminBlogComponent {
    blogPosts = [
        { id: 1, title: 'Top 10 Medical Colleges in 2026', author: 'Dr. Smith', status: 'Published', date: 'Jan 15, 2026' },
        { id: 2, title: 'How to Prepare for NEET', author: 'Admin', status: 'Draft', date: 'Jan 10, 2026' },
    ];

    columns = [
        { key: 'title', header: 'Post Title' },
        { key: 'author', header: 'Author' },
        { key: 'status', header: 'Status' },
        { key: 'date', header: 'Published Date' }
    ];
}
