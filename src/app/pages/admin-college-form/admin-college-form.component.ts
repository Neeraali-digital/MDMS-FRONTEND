import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-admin-college-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './admin-college-form.component.html',
    styleUrls: ['./admin-college-form.component.scss']
})
export class AdminCollegeFormComponent implements OnInit {
    college: any = {
        name: '',
        slug: '',
        location: '',
        type: 'Private',
        category: 'medical',
        description: '',
        featured: false,
        about: '',
        highlights: [],
        courses: []
    };

    categories = [
        { value: 'medical', label: 'Medical' },
        { value: 'dental', label: 'Dental' },
        { value: 'ayurveda', label: 'Ayurveda' },
        { value: 'homeo', label: 'Homeo' },
        { value: 'naturopathy', label: 'Naturopathy' }
    ];

    // UI States
    isLoading = false;
    submitted = false;
    errorMessage = '';

    // File handling
    imageFile: File | null = null;
    galleryFiles: File[] = [];
    galleryPreviews: string[] = [];
    isEditMode = false;
    currentSlug = '';

    // Repeater Inputs
    newHighlight = '';

    // Course Input
    newCourse = {
        name: '',
        duration: '',
        seats: '',
        fees: ''
    };

    constructor(
        public router: Router,
        private api: ApiService,
        private route: ActivatedRoute,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if (params['slug']) {
                this.isEditMode = true;
                this.currentSlug = params['slug'];
                this.loadCollege(this.currentSlug);
            } else {
                this.isEditMode = false;
                this.college = {
                    name: '',
                    slug: '',
                    location: '',
                    type: 'Private',
                    category: 'medical',
                    description: '',
                    featured: false,
                    about: '',
                    highlights: [],
                    courses: []
                };
            }
        });
    }

    loadCollege(slug: string) {
        this.isLoading = true;
        this.api.getCollege(slug).subscribe({
            next: (data) => {
                this.college = data;
                // Ensure array fields
                if (!this.college.highlights) this.college.highlights = [];
                if (!this.college.courses) this.college.courses = [];
                // If gallery exists (urls), show them. (Assuming string list)
                if (this.college.gallery && Array.isArray(this.college.gallery)) {
                    this.galleryPreviews = this.college.gallery;
                }
                this.isLoading = false;
                this.cdr.detectChanges();
            },
            error: (err) => {
                console.error('Error loading college:', err);
                this.isLoading = false;
                this.cdr.detectChanges();
                alert('Failed to load college data');
                this.router.navigate(['/admin/colleges']);
            }
        });
    }

    generateSlug() {
        if (!this.isEditMode && this.college.name) {
            this.college.slug = this.college.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
        }
    }

    // Image handlers
    onImageSelected(event: any) {
        if (event.target.files && event.target.files[0]) {
            this.imageFile = event.target.files[0];
        }
    }

    onGallerySelected(event: any) {
        if (event.target.files) {
            const files = Array.from(event.target.files) as File[];
            if (files.length > 4) {
                alert('Maximum 4 images allowed');
                return;
            }
            this.galleryFiles = files;

            // Generate previews
            this.galleryPreviews = [];
            files.forEach(file => {
                const reader = new FileReader();
                reader.onload = (e: any) => this.galleryPreviews.push(e.target.result);
                reader.readAsDataURL(file);
            });
        }
    }

    // Highlight handlers
    addHighlight() {
        if (this.newHighlight.trim()) {
            this.college.highlights.push(this.newHighlight.trim());
            this.newHighlight = '';
        }
    }

    removeHighlight(index: number) {
        this.college.highlights.splice(index, 1);
    }

    // Course handlers
    addCourse() {
        if (this.newCourse.name) {
            this.college.courses.push({ ...this.newCourse });
            this.newCourse = { name: '', duration: '', seats: '', fees: '' };
        }
    }

    removeCourse(index: number) {
        this.college.courses.splice(index, 1);
    }

    validateForm(): boolean {
        if (!this.college.name) return false;
        if (!this.college.slug) return false;
        if (!this.college.location) return false;
        if (!this.college.category) return false;
        if (!this.college.type) return false;
        return true;
    }

    save() {
        this.submitted = true;
        this.errorMessage = '';

        if (!this.validateForm()) {
            this.errorMessage = 'Please fill in all required fields marked with *';
            window.scrollTo(0, 0);
            return;
        }

        this.isLoading = true;
        const formData = new FormData();

        // Append basic fields
        Object.keys(this.college).forEach(key => {
            if (key !== 'highlights' && key !== 'courses' && key !== 'gallery' && key !== 'image' && key !== 'heroImage') {
                formData.append(key, this.college[key]);
            }
        });

        // Append Complex Data (JSON)
        formData.append('highlights', JSON.stringify(this.college.highlights));
        formData.append('courses', JSON.stringify(this.college.courses));

        // Append Files
        if (this.imageFile) {
            formData.append('image', this.imageFile);
        }

        // Append Gallery Files (using a designated key that Backend must handle)
        this.galleryFiles.forEach((file) => {
            formData.append('gallery_files', file);
        });

        // Determine Create vs Update
        const request = this.isEditMode
            ? this.api.updateCollege(this.currentSlug, formData)
            : this.api.createCollege(formData);

        request.subscribe({
            next: () => {
                alert(`College ${this.isEditMode ? 'Updated' : 'Saved'} Successfully!`);
                this.isLoading = false;
                this.router.navigate(['/admin/colleges']); // Redirect to list instead of dashboard for better flow
            },
            error: (err) => {
                console.error('Error saving college:', err);
                this.isLoading = false;
                if (err.error) {
                    const msgs = Object.entries(err.error).map(([k, v]) => `${k}: ${v}`).join('\n');
                    this.errorMessage = msgs || 'Failed to save college.';
                } else {
                    this.errorMessage = 'An unexpected error occurred.';
                }
                window.scrollTo(0, 0);
            }
        });
    }
}
