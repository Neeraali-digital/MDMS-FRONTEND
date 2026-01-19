import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-college-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './college-detail.html',
  styleUrl: './college-detail.scss'
})
export class CollegeDetailComponent implements OnInit {
  collegeId: string | null = null;
  college: any = null;
  activeTab: string = 'overview';

  // Enquiry state
  enquiry = {
    name: '',
    phone: '',
    email: '',
    message: '',
    enquiry_type: 'Admission Enquiry'
  };
  submitting = false;
  submitted = false;
  successMessage = '';

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
    return this.api.getMediaUrl(url);
  }

  submitEnquiry() {
    this.submitted = true;
    if (!this.enquiry.name || !this.enquiry.phone || this.enquiry.phone.length !== 10) {
      return;
    }

    this.submitting = true;
    const payload = {
      ...this.enquiry,
      college: this.college.id,
      message: `Admission enquiry for ${this.college.name}. ` + (this.enquiry.message || '')
    };

    this.api.createEnquiry(payload).subscribe({
      next: () => {
        this.submitting = false;
        this.successMessage = 'Thank you! Admission details have been sent to your contact info.';
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        this.submitting = false;
        console.error('Enquiry failed:', err);
        alert('Failed to submit enquiry. Please try again.');
        this.cdr.detectChanges();
      }
    });
  }
}
