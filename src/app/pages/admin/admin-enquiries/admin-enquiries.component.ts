import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';

@Component({
    selector: 'app-admin-enquiries',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './admin-enquiries.component.html',
    styleUrls: ['./admin-enquiries.component.scss']
})
export class AdminEnquiriesComponent implements OnInit {
    enquiries: any[] = [];
    filteredEnquiries: any[] = [];
    loading = true;
    selectedEnquiry: any = null;
    showModal = false;
    searchTerm = '';

    constructor(
        private api: ApiService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.fetchEnquiries();
    }

    applySearch() {
        const term = this.searchTerm.toLowerCase().trim();
        if (!term) {
            this.filteredEnquiries = [...this.enquiries];
        } else {
            this.filteredEnquiries = this.enquiries.filter(eq =>
                eq.name?.toLowerCase().includes(term) ||
                eq.email?.toLowerCase().includes(term) ||
                eq.phone?.includes(term) ||
                eq.enquiry_type?.toLowerCase().includes(term) ||
                eq.college_name?.toLowerCase().includes(term)
            );
        }
        this.cdr.detectChanges();
    }

    viewEnquiry(eq: any) {
        this.selectedEnquiry = eq;
        this.showModal = true;
        this.cdr.detectChanges();
    }

    closeModal() {
        this.showModal = false;
        this.selectedEnquiry = null;
        this.cdr.detectChanges();
    }

    fetchEnquiries() {
        this.loading = true;
        this.api.getEnquiries().subscribe({
            next: (data) => {
                this.enquiries = data;
                this.applySearch(); // Initialize filteredEnquiries
                this.loading = false;
                this.cdr.detectChanges();
            },
            error: (err) => {
                console.error('Failed to fetch enquiries:', err);
                this.loading = false;
                this.cdr.detectChanges();
            }
        });
    }
}
