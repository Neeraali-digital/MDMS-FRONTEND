import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

@Component({
    selector: 'app-generic-page',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
    <div class="course-page-container" *ngIf="!isNewsPage">
        <div class="hero-section" [style.background-image]="'linear-gradient(rgba(17, 24, 39, 0.7), rgba(17, 24, 39, 0.7)), url(' + heroImage + ')'">
            <div class="overlay"></div>
            <div class="container hero-content">
                <span class="badge">{{ subtitle }}</span>
                <h1 class="page-title">{{ title }}</h1>
                <p class="hero-desc">Take the first step towards a successful career in {{ title }}. Get expert guidance and find the best colleges.</p>
                <div class="hero-btns">
                    <button class="btn btn-primary cta-btn" (click)="viewColleges()">Find Colleges</button>
                    <button class="btn btn-outline-white">Counselling Help</button>
                </div>
            </div>
        </div>

        <div class="container main-content-wrapper">
            <div class="content-grid-main">
                <div class="left-content">
                    <section class="overview-section card">
                        <h2 class="section-heading">Overview</h2>
                        <p class="section-text">{{ description }}</p>
                    </section>

                    <section class="features-grid">
                        <div class="feature-item">
                            <div class="icon-box"><i class="icon-clock"></i></div>
                            <h3>Duration</h3>
                            <p>{{ duration }}</p>
                        </div>
                        <div class="feature-item">
                            <div class="icon-box"><i class="icon-graduation-cap"></i></div>
                            <h3>Eligibility</h3>
                            <p>{{ eligibility }}</p>
                        </div>
                        <div class="feature-item">
                            <div class="icon-box"><i class="icon-file-text"></i></div>
                            <h3>Entrance Exam</h3>
                            <p>{{ entranceExam }}</p>
                        </div>
                    </section>

                    <section class="why-section card">
                        <h2 class="section-heading">Why Choose {{ title }}?</h2>
                        <ul class="benefit-list">
                            <li><i class="check">✓</i> High demand in healthcare sector</li>
                            <li><i class="check">✓</i> Opportunities in government and private institutions</li>
                            <li><i class="check">✓</i> Rewarding career with professional growth</li>
                            <li><i class="check">✓</i> Global recognition and practice opportunities</li>
                        </ul>
                    </section>

                    <section class="specializations-section card" *ngIf="specializations.length > 0">
                        <h2 class="section-heading">Specializations</h2>
                        <div class="specs-grid">
                            <div class="spec-card" *ngFor="let spec of specializations">
                                <h4>{{ spec.name }}</h4>
                                <p>{{ spec.desc }}</p>
                            </div>
                        </div>
                    </section>
                </div>

                <div class="right-sidebar">
                    <div class="cta-card-sidebar">
                        <h3>Quick Enquiry</h3>
                        <p>Get personalized admission guidance from our experts for {{ title }}.</p>
                        <form>
                            <div class="form-group">
                                <label class="form-label">Full Name</label>
                                <input type="text" placeholder="e.g. John Doe" class="form-input">
                            </div>
                            <div class="form-group">
                                <label class="form-label">Phone Number</label>
                                <input type="tel" placeholder="+91 00000 00000" class="form-input">
                            </div>
                            <button class="btn btn-primary full-width">Submit Now</button>
                        </form>
                    </div>

                    <div class="help-box">
                        <h4>Need Help?</h4>
                        <p>Call us at +91 98765 43210</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- News Page Template -->
    <div class="news-page-container" *ngIf="isNewsPage">
        <div class="news-hero">
            <div class="container">
                <div class="news-hero-content">
                    <span class="news-tag">LATEST UPDATES</span>
                    <h1>{{ title }}</h1>
                    <p>{{ subtitle }}</p>
                </div>
            </div>
        </div>
        <div class="container news-content-layout">
            <div class="news-listing">
                <div class="news-card-modern" *ngFor="let news of newsList">
                    <div class="news-info">
                        <div class="news-meta">
                            <span class="news-category">Update</span>
                            <span class="news-date">{{ news.date }}</span>
                        </div>
                        <h3>{{ news.title }}</h3>
                        <p>{{ news.excerpt }}</p>
                        <a href="javascript:void(0)" class="news-link">Read Full Announcement &rarr;</a>
                    </div>
                </div>
            </div>
            
            <aside class="news-sidebar-modern">
                <div class="sidebar-widget trending">
                    <h3>Trending Topics</h3>
                    <ul>
                        <li><a href="#">NEET PG 2024 Updates</a></li>
                        <li><a href="#">MCC Counselling Round 1</a></li>
                        <li><a href="#">States Merit List PDF</a></li>
                        <li><a href="#">Document Verification Rules</a></li>
                    </ul>
                </div>

                <div class="sidebar-widget newsletter">
                    <h3>Newsletter</h3>
                    <p>Subscribe to get latest updates directly in your inbox.</p>
                    <input type="email" placeholder="Email Address">
                    <button class="btn btn-secondary">Subscribe</button>
                </div>
            </aside>
        </div>
    </div>
  `,
    styles: [`
    .course-page-container { padding-bottom: 5rem; background: #f8fafc; }
    .hero-section {
        position: relative; 
        min-height: 500px; 
        background-size: cover; 
        background-position: center; 
        color: white; 
        display: flex; 
        align-items: center; 
        text-align: center;
        padding: 4rem 1rem 8rem;
    }
    .hero-content { max-width: 900px; margin: 0 auto; position: relative; z-index: 2; }
    .badge { 
        background: rgba(255,255,255,0.2); 
        backdrop-filter: blur(10px);
        padding: 0.6rem 1.2rem; 
        border-radius: 50px; 
        font-size: 0.85rem; 
        font-weight: 700; 
        margin-bottom: 1.5rem; 
        display: inline-block;
        border: 1px solid rgba(255,255,255,0.3);
        letter-spacing: 0.5px;
    }
    .page-title { 
        font-size: 4.5rem; 
        font-weight: 900; 
        margin-bottom: 1.5rem; 
        line-height: 1.1;
        text-shadow: 0 4px 20px rgba(0,0,0,0.3);
        color: #ffffff;
    }
    .hero-desc { font-size: 1.3rem; opacity: 0.95; margin-bottom: 3rem; line-height: 1.6; max-width: 700px; margin-left: auto; margin-right: auto; }
    .hero-btns { display: flex; gap: 1.5rem; justify-content: center; margin-bottom: 2rem; }
    
    .main-content-wrapper { margin-top: -80px; position: relative; z-index: 10; padding: 0 1rem; }
    .content-grid-main { display: grid; grid-template-columns: 1fr 380px; gap: 3rem; }
    
    .card { background: white; padding: 3rem; border-radius: 24px; box-shadow: 0 10px 40px rgba(0,0,0,0.04); margin-bottom: 2.5rem; border: 1px solid rgba(0,0,0,0.02); }
    .section-heading { color: var(--blue-900); font-size: 2rem; margin-bottom: 2rem; font-weight: 800; letter-spacing: -0.5px; }
    .section-text { color: var(--text-main); line-height: 1.9; font-size: 1.1rem; }
    
    .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-bottom: 3rem; }
    .feature-item { 
        background: white; 
        padding: 2rem; 
        border-radius: 20px; 
        box-shadow: 0 10px 30px rgba(0,0,0,0.03); 
        text-align: center; 
        border: 1px solid rgba(0,0,0,0.02);
        transition: transform 0.3s;
    }
    .feature-item:hover { transform: translateY(-5px); }
    .icon-box { font-size: 2rem; color: var(--blue-600); margin-bottom: 1rem; }
    .feature-item h3 { font-size: 0.85rem; color: var(--text-light); margin-bottom: 0.8rem; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; }
    .feature-item p { font-size: 1.2rem; color: var(--blue-900); font-weight: 800; }
    
    .benefit-list { list-style: none; padding: 0; }
    .benefit-list li { margin-bottom: 1.2rem; display: flex; align-items: flex-start; gap: 1.2rem; color: var(--text-main); font-weight: 500; font-size: 1.05rem; }
    .check { 
        color: white; 
        background: #10b981; 
        width: 24px; 
        height: 24px; 
        border-radius: 50%; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        font-size: 0.7rem; 
        flex-shrink: 0;
        margin-top: 2px;
    }

    .specs-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
    .spec-card { background: #fdfdfd; padding: 2rem; border-radius: 16px; border: 1px solid #f1f5f9; transition: all 0.3s; }
    .spec-card:hover { border-color: var(--blue-300); background: white; box-shadow: 0 10px 20px rgba(0,0,0,0.02); }
    .spec-card h4 { color: var(--blue-800); margin-bottom: 0.8rem; font-size: 1.2rem; font-weight: 700; }
    .spec-card p { font-size: 0.95rem; color: var(--text-light); line-height: 1.6; }
    
    .right-sidebar { position: sticky; top: 100px; height: fit-content; }
    .cta-card-sidebar { 
        background: white; 
        padding: 2.5rem; 
        border-radius: 24px; 
        box-shadow: 0 20px 50px rgba(0,0,0,0.08); 
        margin-bottom: 2rem; 
        border: 1px solid #f1f5f9;
        position: relative;
        overflow: hidden;
    }
    .cta-card-sidebar::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 6px;
        background: linear-gradient(to right, var(--blue-400), var(--blue-600));
    }
    .cta-card-sidebar h3 { font-size: 1.6rem; color: var(--blue-900); margin-bottom: 0.8rem; font-weight: 800; }
    .cta-card-sidebar p { font-size: 0.95rem; color: var(--text-light); margin-bottom: 2rem; line-height: 1.5; }
    
    .form-group { margin-bottom: 1.2rem; }
    .form-label { display: block; font-size: 0.85rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.5px; }
    .form-input { 
        width: 100%; 
        padding: 1rem 1.2rem; 
        border-radius: 12px; 
        border: 2px solid #f1f5f9; 
        background: #f8fafc;
        font-size: 1rem; 
        color: var(--text-main);
        transition: all 0.3s;
        outline: none;
    }
    .form-input:focus { border-color: var(--blue-500); background: white; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1); }
    
    .help-box { 
        background: linear-gradient(135deg, var(--blue-600), var(--blue-800)); 
        padding: 2rem; 
        border-radius: 20px; 
        text-align: center; 
        color: white;
        box-shadow: 0 10px 30px rgba(var(--blue-600-rgb), 0.3);
    }
    .help-box h4 { opacity: 0.8;color:white; font-size: 0.9rem; margin-bottom: 0.5rem; text-transform: uppercase; font-weight: 700; }
    .help-box p { font-weight: 800; font-size: 1.4rem; }
    
    /* News Modern Styles */
    .news-page-container { background: #f1f5f9; min-height: 100vh; padding-bottom: 4rem; }
    .news-hero { background: white; padding: 4rem 0; border-bottom: 1px solid var(--border); box-shadow: 0 2px 15px rgba(0,0,0,0.02); }
    .news-tag { border: 1px solid var(--blue-200); color: var(--blue-600); padding: 0.4rem 1rem; border-radius: 50px; font-size: 0.75rem; font-weight: 700; margin-bottom: 1.5rem; display: inline-block; }
    .news-hero h1 { font-size: 3rem; color: var(--blue-900); margin-bottom: 1rem; }
    .news-hero p { font-size: 1.2rem; color: var(--text-light); }
    
    .news-content-layout { display: grid; grid-template-columns: 1fr 350px; gap: 3rem; margin-top: 3rem; }
    .news-card-modern { background: white; border-radius: 16px; margin-bottom: 2rem; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); transition: transform 0.3s; }
    .news-card-modern:hover { transform: translateY(-5px); }
    .news-info { padding: 2rem; }
    .news-meta { display: flex; gap: 1.5rem; margin-bottom: 1rem; align-items: center; }
    .news-category { background: #eff6ff; color: var(--blue-600); font-size: 0.75rem; font-weight: 700; padding: 0.3rem 0.8rem; border-radius: 4px; }
    .news-date { font-size: 0.85rem; color: var(--text-light); }
    .news-card-modern h3 { font-size: 1.5rem; color: var(--blue-900); margin-bottom: 1rem; line-height: 1.4; }
    .news-card-modern p { color: var(--text-main); line-height: 1.6; margin-bottom: 1.5rem; }
    .news-link { color: var(--blue-600); text-decoration: none; font-weight: 700; font-size: 0.9rem; }
    
    .sidebar-widget { background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); margin-bottom: 2rem; }
    .sidebar-widget h3 { color: var(--blue-900); font-size: 1.2rem; margin-bottom: 1.5rem; border-bottom: 2px solid var(--blue-500); display: inline-block; padding-bottom: 0.5rem; }
    .trending ul { list-style: none; padding: 0; }
    .trending li { margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #f1f5f9; }
    .trending li:last-child { border: none; }
    .trending a { color: var(--text-main); font-weight: 500; font-size: 0.95rem; display: block; }
    .trending a:hover { color: var(--blue-600); }
    
    .newsletter input { width: 100%; padding: 0.8rem; border: 1px solid var(--border); border-radius: 8px; margin-bottom: 1rem; }
    
    @media (max-width: 992px) {
        .content-grid-main, .news-content-layout { grid-template-columns: 1fr; }
        .hero-section { height: auto; padding: 5rem 1rem; }
        .page-title { font-size: 2.5rem; }
        .features-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class GenericPageComponent implements OnInit {
    title = 'Course';
    subtitle = 'Course Description';
    description = 'Detailed information about this course.';
    duration = 'N/A';
    eligibility = 'N/A';
    entranceExam = 'N/A';
    heroImage = 'https://images.unsplash.com/photo-1576089172869-4f5f19dad13f?auto=format&fit=crop&q=80&w=1200';
    specializations: any[] = [];
    courseId: string = '';
    isNewsPage = false;
    newsList: any[] = [];

    courseData: any = {
        'md-ms': {
            title: 'MD/MS Admission',
            subtitle: 'Postgraduate Medical Degrees',
            heroImage: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200',
            description: 'Doctor of Medicine (MD) and Master of Surgery (MS) are the two primary postgraduate medical degrees. These courses allow doctors to specialize in various fields of medicine and surgery.',
            duration: '3 Years',
            eligibility: 'MBBS Degree + Internship',
            entranceExam: 'NEET PG',
            specializations: [
                { name: 'MD General Medicine', desc: 'Diagnosis and treatment of adult diseases.' },
                { name: 'MS General Surgery', desc: 'Surgical procedures and techniques.' },
                { name: 'MD Pediatrics', desc: 'Medical care of infants and children.' },
                { name: 'MD Anesthesiology', desc: 'Pain relief and care during surgery.' }
            ]
        },
        'dm-mch': {
            title: 'DM/MCh Admission',
            subtitle: 'Super Specialty Medical Degrees',
            heroImage: 'https://images.unsplash.com/photo-1579154235602-3c35bd7996a6?auto=format&fit=crop&q=80&w=1200',
            description: 'Doctorate of Medicine (DM) and Master of Chirurgiae (MCh) are super-specialty courses for those who have completed MD/MS.',
            duration: '3 Years',
            eligibility: 'MD/MS in relevant field',
            entranceExam: 'NEET SS',
            specializations: [
                { name: 'DM Cardiology', desc: 'Disorders of the heart.' },
                { name: 'DM Neurology', desc: 'Disorders of the nervous system.' },
                { name: 'MCh Urology', desc: 'Surgical diseases of the urinary tract.' },
                { name: 'MCh Neurosurgery', desc: 'Surgical treatment of nervous system disorders.' }
            ]
        },
        'mds': {
            title: 'MDS Admission',
            subtitle: 'Master of Dental Surgery',
            heroImage: 'https://images.unsplash.com/photo-1593054999502-c97c0d46d0a0?auto=format&fit=crop&q=80&w=1200',
            description: 'MDS is the postgraduate degree in dentistry, allowing specialization in various dental fields.',
            duration: '3 Years',
            eligibility: 'BDS Degree',
            entranceExam: 'NEET MDS',
            specializations: [
                { name: 'Orthodontics', desc: 'Alignment of teeth and jaws.' },
                { name: 'Oral Surgery', desc: 'Surgical procedures in the oral cavity.' },
                { name: 'Prosthodontics', desc: 'Replacement of missing teeth.' }
            ]
        },
        'mbbs': {
            title: 'MBBS Admission',
            subtitle: 'Bachelor of Medicine and Bachelor of Surgery',
            heroImage: 'https://images.unsplash.com/photo-1576091160550-2187d80afea2?auto=format&fit=crop&q=80&w=1200',
            description: 'MBBS is the professional undergraduate medical degree required to become a doctor.',
            duration: '5.5 Years',
            eligibility: '10+2 with PCB',
            entranceExam: 'NEET UG'
        },
        'bds': {
            title: 'BDS Admission',
            subtitle: 'Bachelor of Dental Surgery',
            heroImage: 'https://images.unsplash.com/photo-1468493858157-0da44aaf1d13?auto=format&fit=crop&q=80&w=1200',
            description: 'BDS is the undergraduate degree for dentists. It is the only professional dental course in India.',
            duration: '5 Years',
            eligibility: '10+2 with PCB',
            entranceExam: 'NEET UG'
        },
        'bams': {
            title: 'BAMS Admission',
            subtitle: 'Bachelor of Ayurvedic Medicine and Surgery',
            heroImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200',
            description: 'BAMS is an undergraduate degree programme designed to make students familiar with the concepts of Ayurveda.',
            duration: '5.5 Years',
            eligibility: '10+2 with PCB',
            entranceExam: 'NEET UG'
        },
        'bhms': {
            title: 'BHMS Admission',
            subtitle: 'Bachelor of Homeopathic Medicine and Surgery',
            heroImage: 'https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&q=80&w=1200',
            description: 'BHMS is an undergraduate degree in Homeopathy through which one can become a Homeopathic doctor.',
            duration: '5.5 Years',
            eligibility: '10+2 with PCB',
            entranceExam: 'NEET UG'
        },
        'bnys': {
            title: 'BNYS Admission',
            subtitle: 'Bachelor of Naturopathy and Yogic Sciences',
            heroImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200',
            description: 'BNYS is an undergraduate degree program in Associate Medical Sciences focusing on Naturopathy and Yoga.',
            duration: '5.5 Years',
            eligibility: '10+2 with Science',
            entranceExam: 'Merit / NEET'
        }
    };

    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            let id = params.get('id') || '';
            this.courseId = id;
            this.isNewsPage = false;
            this.newsList = [];
            this.specializations = [];
            this.heroImage = 'https://images.unsplash.com/photo-1576089172869-4f5f19dad13f?auto=format&fit=crop&q=80&w=1200';

            if (this.router.url.includes('news')) {
                // News Logic
                this.isNewsPage = true;
                const newsId = id.toUpperCase();
                this.title = `${newsId} Latest Updates`;
                this.subtitle = `Stay informed with the latest news from ${newsId}`;

                // Mock News Data
                this.newsList = [
                    { title: `${newsId} 2024 Counselling Schedule Released`, date: '2 days ago', excerpt: 'The official schedule for round 1 counselling has been announced. Check dates here.' },
                    { title: 'Important Notice Regarding Document Verification', date: '5 days ago', excerpt: 'Candidates must carry original documents for physical verification at designated centers.' },
                    { title: 'Seat Matrix for Round 1 Published', date: '1 week ago', excerpt: 'View the category-wise seat distribution for government and private colleges.' },
                    { title: 'Revised Cut-off Scores Announced', date: '2 weeks ago', excerpt: 'The authority has revised the qualifying percentile for this academic session.' }
                ];
            } else if (this.courseData[id]) {
                const data = this.courseData[id];
                this.title = data.title;
                this.subtitle = data.subtitle;
                this.description = data.description;
                this.duration = data.duration;
                this.eligibility = data.eligibility;
                this.entranceExam = data.entranceExam;
                this.specializations = data.specializations || [];
                if (data.heroImage) this.heroImage = data.heroImage;
            } else {
                // Fallback
                const name = id ? id.replace(/-/g, ' ').toUpperCase() : 'COURSE';
                this.title = name;
                this.subtitle = 'Admission Details';
            }
        });
    }

    viewColleges() {
        this.router.navigate(['/colleges'], { queryParams: { type: this.courseId } });
    }
}
