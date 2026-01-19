import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { RouterModule, Router } from '@angular/router';

@Component({
    selector: 'app-admin-colleges',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './admin-colleges.component.html',
    styleUrls: ['./admin-colleges.component.scss']
})
export class AdminCollegesComponent implements OnInit {
    colleges: any[] = [];
    loading = true;

    constructor(private api: ApiService, private router: Router) { }

    ngOnInit() {
        this.fetchColleges();
    }

    fetchColleges() {
        this.loading = true;
        this.api.getColleges().subscribe({
            next: (data) => {
                this.colleges = data;
                this.loading = false;
            },
            error: () => this.loading = false
        });
    }

    deleteCollege(slug: string) {
        if (confirm('Are you sure you want to delete this college?')) {
            // API call would go here
            alert('Delete functionality to be implemented in API');
        }
    }
}
