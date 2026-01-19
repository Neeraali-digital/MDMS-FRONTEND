import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin-college-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './admin-college-form.component.html',
    styleUrls: ['./admin-college-form.component.scss']
})
export class AdminCollegeFormComponent {
    college: any = {
        name: '',
        slug: '',
        location: '',
        type: 'Private', // Default
        category: 'medical', // Default
        description: '',
        featured: false
    };

    categories = [
        { value: 'medical', label: 'Medical' },
        { value: 'dental', label: 'Dental' },
        { value: 'ayurveda', label: 'Ayurveda' },
        { value: 'homeo', label: 'Homeo' },
        { value: 'naturopathy', label: 'Naturopathy' }
    ];

    constructor(private api: ApiService, public router: Router) { }

    generateSlug() {
        this.college.slug = this.college.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    }

    save() {
        this.api.createCollege(this.college).subscribe({
            next: () => this.router.navigate(['/admin/dashboard']),
            error: (err) => alert('Failed to create college: ' + JSON.stringify(err.error))
        });
    }
}
