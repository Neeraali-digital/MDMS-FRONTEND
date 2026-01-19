import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-college-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './college-detail.html',
  styleUrl: './college-detail.scss'
})
export class CollegeDetailComponent implements OnInit {
  collegeId: string | null = null;
  college: any = null;
  activeTab: string = 'overview';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.collegeId = params.get('id');
      if (this.collegeId) {
        this.loadCollegeDetails(this.collegeId);
      }
    });
  }

  loadCollegeDetails(id: string) {
    this.api.getCollege(id).subscribe({
      next: (data) => {
        this.college = data;
        // Ensure lists are valid if backend returns null/empty
        if (!this.college.highlights) this.college.highlights = [];
        if (!this.college.courses) this.college.courses = [];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load college:', err);
        this.cdr.detectChanges();
        // Optional: Handle error (e.g., redirect to 404)
      }
    });
  }

  getImageUrl(url: string): string {
    if (!url) return 'assets/placeholder-college.jpg';
    if (url.startsWith('http')) return url;
    return `http://127.0.0.1:8000${url}`;
  }
}
