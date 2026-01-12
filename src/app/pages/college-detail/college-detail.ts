import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { COLLEGES_DATA } from '../../data/colleges.data';

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

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.collegeId = params.get('id');
      if (this.collegeId) {
        this.loadCollegeDetails(this.collegeId);
      }
    });
  }

  loadCollegeDetails(id: string) {
    // Search in our central data first
    const found = COLLEGES_DATA.find(c => c.slug === id);

    if (found) {
      // Map to our UI structure
      this.college = {
        name: found.name,
        location: found.location,
        heroImage: found.image,
        about: found.description,
        highlights: [
          'Affiliated to Recognized University',
          'Modern Infrastructure',
          'Experienced Faculty',
          'Clinical Exposure'
        ],
        courses: found.courses.map(c => ({
          name: c,
          duration: c === 'MBBS' ? '5.5 Years' : '3 Years',
          seats: 'Varied',
          fees: 'As per Norms'
        }))
      };
    } else if (id === 'cmc-vellore') {
      // Keep existing mock if specifically requested
      this.college = {
        name: 'Christian Medical College (CMC)',
        location: 'Vellore, Tamil Nadu',
        heroImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200',
        about: 'Christian Medical College Vellore is renowned for its excellence in medical education, research, and healthcare. It continues to be one of the best private medical colleges in India.',
        highlights: ['Ranked 3rd in NIRF 2023', '100+ Years of Excellence', 'NABH Accredited Hospital', 'Vast Research Facilities'],
        courses: [
          { name: 'MBBS', duration: '5.5 Years', seats: '100', fees: 'Previous Year Based' },
          { name: 'MD General Medicine', duration: '3 Years', seats: '16', fees: 'As per Norms' },
          { name: 'MS General Surgery', duration: '3 Years', seats: '10', fees: 'As per Norms' }
        ]
      };
    } else {
      // Generic fallback
      const name = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      this.college = {
        name: name,
        location: 'Karnataka',
        heroImage: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200',
        about: `${name} is a premier institution dedicated to medical excellence. Providing top-tier education and healthcare services to the community.`,
        highlights: ['Excellent Infrastructure', 'Experienced Faculty', 'Modern Laboratories', 'Attached Teaching Hospital'],
        courses: [
          { name: 'MBBS', duration: '5.5 Years', seats: '150', fees: 'As per KEA' },
          { name: 'MD/MS', duration: '3 Years', seats: 'Varied', fees: 'As per KEA' }
        ]
      };
    }
  }
}
