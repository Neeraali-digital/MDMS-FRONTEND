import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-colleges',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './colleges.html',
  styleUrl: './colleges.scss',
})
export class Colleges implements OnInit {
  colleges: any[] = [];
  filteredColleges: any[] = [];
  searchTerm = '';
  heroTitle = 'Top Medical Colleges in India';
  heroBg = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200';
  currentCategory = '';
  loading = false;

  categoryTitles: any = {
    'medical': 'Top Medical Colleges',
    'dental': 'Top Dental Colleges',
    'ayurveda': 'Top Ayurvedic Colleges',
    'homeo': 'Top Homeopathic Colleges',
    'naturopathy': 'Top Naturopathy Colleges'
  };

  categoryBgs: any = {
    'medical': 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200',
    'dental': 'https://images.unsplash.com/photo-1593054999502-c97c0d46d0a0?auto=format&fit=crop&q=80&w=1200',
    'ayurveda': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200',
    'homeo': 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&q=80&w=1200',
    'naturopathy': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200'
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.currentCategory = params['type'] || '';
      this.searchTerm = '';

      if (this.currentCategory) {
        this.heroTitle = this.categoryTitles[this.currentCategory] || 'Top Colleges in India';
        this.heroBg = this.categoryBgs[this.currentCategory] || this.heroBg;
        this.fetchColleges({ category: this.currentCategory });
      } else {
        this.heroTitle = 'Top Medical Colleges in India';
        this.heroBg = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200';
        this.fetchColleges();
      }
    });
  }

  fetchColleges(filters: any = {}) {
    this.loading = true;
    this.colleges = []; // Clear previous
    this.filteredColleges = [];

    this.api.getColleges(filters).subscribe({
      next: (data) => {
        this.colleges = Array.isArray(data) ? data : (data.results || []);
        this.filteredColleges = this.colleges;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching colleges:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onSearch(event: any) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value.toLowerCase();
    this.applyFilters();
  }

  applyFilters() {
    // Client-side search filtering (or could utilize backend search)
    let results = this.colleges;
    if (this.searchTerm) {
      results = results.filter(college =>
        college.name.toLowerCase().includes(this.searchTerm) ||
        college.location.toLowerCase().includes(this.searchTerm)
      );
    }
    this.filteredColleges = results;
  }

  viewCollege(slug: string) {
    this.router.navigate(['/colleges', slug]);
  }

  getImageUrl(url: string): string {
    return this.api.getMediaUrl(url);
  }

  handleImageError(event: any) {
    event.target.src = 'https://placehold.co/600x400?text=College+Image';
  }
}
