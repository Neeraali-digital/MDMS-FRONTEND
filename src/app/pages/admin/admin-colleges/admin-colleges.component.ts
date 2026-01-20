import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-admin-colleges',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './admin-colleges.component.html',
    styleUrls: ['./admin-colleges.component.scss']
})
export class AdminCollegesComponent implements OnInit {
    colleges: any[] = [];
    filteredColleges: any[] = [];
    searchTerm: string = '';
    loading = true;

    constructor(
        private api: ApiService,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.fetchColleges();
    }

    fetchColleges() {
        this.loading = true;
        this.api.getColleges().subscribe({
            next: (data) => {
                // Handle potential pagination
                this.colleges = Array.isArray(data) ? data : (data.results || []);
                this.applySearch(); // Apply initial filter/setup filteredColleges
                this.loading = false;
                console.log('Colleges loaded:', this.colleges);
                this.cdr.detectChanges(); // Force update
            },
            error: (err) => {
                console.error('Error fetching colleges:', err);
                this.loading = false;
                this.cdr.detectChanges();
            }
        });
    }

    applySearch() {
        if (!this.searchTerm) {
            this.filteredColleges = [...this.colleges];
        } else {
            const term = this.searchTerm.toLowerCase().trim();
            this.filteredColleges = this.colleges.filter(college =>
                college.name?.toLowerCase().includes(term) ||
                college.category?.toLowerCase().includes(term) ||
                college.location?.toLowerCase().includes(term)
            );
        }
    }

    deleteCollege(slug: string) {
        if (confirm('Are you sure you want to delete this college?')) {
            this.loading = true;
            this.api.deleteCollege(slug).subscribe({
                next: () => {
                    alert('College Deleted Successfully');
                    this.fetchColleges(); // Refresh the list
                },
                error: (err) => {
                    console.error('Error deleting college:', err);
                    alert('Failed to delete college');
                    this.loading = false;
                    this.cdr.detectChanges();
                }
            });
        }
    }

    editCollege(slug: string) {
        this.router.navigate(['/admin/college', slug]);
    }
}
