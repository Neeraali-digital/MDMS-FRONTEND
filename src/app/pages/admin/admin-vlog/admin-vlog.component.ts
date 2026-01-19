import { Component } from '@angular/core';
import { AdminGenericCrudComponent } from '../admin-generic-crud/admin-generic-crud.component';

@Component({
    selector: 'app-admin-vlog',
    standalone: true,
    imports: [AdminGenericCrudComponent],
    template: `<app-admin-generic-crud [title]="'Vlogs'" [data]="vlogs" [columns]="columns"></app-admin-generic-crud>`
})
export class AdminVlogComponent {
    vlogs = [
        { title: 'Campus Tour: AIIMS Delhi', duration: '12:45', views: '1.2k', date: 'Jan 12, 2026' },
        { title: 'Student Life at BMC', duration: '08:30', views: '850', date: 'Jan 05, 2026' },
    ];

    columns = [
        { key: 'title', header: 'Video Title' },
        { key: 'duration', header: 'Duration' },
        { key: 'views', header: 'Views' },
        { key: 'date', header: 'Upload Date' }
    ];
}
