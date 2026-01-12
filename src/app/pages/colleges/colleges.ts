import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { COLLEGES_DATA } from '../../data/colleges.data';

@Component({
  selector: 'app-colleges',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './colleges.html',
  styleUrl: './colleges.scss',
})
export class Colleges implements OnInit {
  colleges = COLLEGES_DATA;
  filteredColleges = COLLEGES_DATA;
  searchTerm = '';
  heroTitle = 'Top Medical Colleges in India';
  heroBg = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200';
  currentCategory = '';

  categoryMap: any = {
    'medical': ['MBBS', 'MD', 'MS', 'DM', 'MCh'],
    'dental': ['BDS', 'MDS'],
    'ayurveda': ['BAMS'],
    'homeo': ['BHMS'],
    'naturopathy': ['BNYS']
  };

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

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.currentCategory = params['type'] || '';
      this.searchTerm = ''; // Reset search on category change

      if (this.currentCategory) {
        this.heroTitle = this.categoryTitles[this.currentCategory] || 'Top Colleges in India';
        this.heroBg = this.categoryBgs[this.currentCategory] || this.heroBg;
      } else {
        this.heroTitle = 'Top Medical Colleges in India';
        this.heroBg = 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200';
      }

      this.applyFilters();
    });
  }

  onSearch(event: any) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value.toLowerCase();
    this.applyFilters();
  }

  applyFilters() {
    let results = this.colleges;

    // Filter by Category/Type
    if (this.currentCategory && this.categoryMap[this.currentCategory]) {
      const allowedCourses = this.categoryMap[this.currentCategory];
      results = results.filter(college =>
        college.courses.some(course => allowedCourses.includes(course))
      );
    }

    // Filter by Search Term
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
}
