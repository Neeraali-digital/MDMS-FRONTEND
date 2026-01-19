import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';

@Component({
    selector: 'app-admin-enquiries',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './admin-enquiries.component.html',
    styleUrls: ['./admin-enquiries.component.scss']
})
export class AdminEnquiriesComponent implements OnInit {
    enquiries: any[] = [];
    loading = true;

    constructor(private api: ApiService) { }

    ngOnInit() {
        this.fetchEnquiries();
    }

    fetchEnquiries() {
        this.loading = true;
        this.api.getEnquiries().subscribe({
            next: (data) => {
                this.enquiries = data;
                this.loading = false;
            },
            error: () => this.loading = false
        });
    }
}
