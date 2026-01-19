import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
    selector: 'app-admin-layout',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './admin-layout.component.html',
    styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
    isSidebarCollapsed = false;

    menuItems = [
        { id: 'dashboard', label: 'Dashboard', link: '/admin/dashboard' },
        { id: 'colleges', label: 'Colleges', link: '/admin/colleges' },
        { id: 'enquiries', label: 'Enquiries', link: '/admin/enquiries' },
        { id: 'blog', label: 'Blog', link: '/admin/blog' },
        { id: 'vlog', label: 'Vlogs', link: '/admin/vlog' },
        { id: 'faq', label: 'FAQs', link: '/admin/index' }, // Adjusted to match potential route
        { id: 'news', label: 'News', link: '/admin/news' },
    ];

    constructor(private api: ApiService, private router: Router) { }

    toggleSidebar() {
        this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }

    logout() {
        this.api.logout();
        this.router.navigate(['/admin/login']);
    }
}
