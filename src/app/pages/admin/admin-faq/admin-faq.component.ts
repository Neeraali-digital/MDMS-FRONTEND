import { Component } from '@angular/core';
import { AdminGenericCrudComponent } from '../admin-generic-crud/admin-generic-crud.component';

@Component({
    selector: 'app-admin-faq',
    standalone: true,
    imports: [AdminGenericCrudComponent],
    template: `<app-admin-generic-crud [title]="'FAQs'" [data]="faqs" [columns]="columns"></app-admin-generic-crud>`
})
export class AdminFaqComponent {
    faqs = [
        { question: 'How to apply for MBBS?', category: 'Admissions', status: 'Published' },
        { question: 'What is the fee structure?', category: 'Fees', status: 'Draft' },
    ];

    columns = [
        { key: 'question', header: 'Question' },
        { key: 'category', header: 'Category' },
        { key: 'status', header: 'Status' }
    ];
}
