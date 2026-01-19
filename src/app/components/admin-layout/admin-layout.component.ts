import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
        { id: 'faq', label: 'FAQs', link: '/admin/faq' },
        { id: 'news', label: 'News', link: '/admin/news' },
    ];

    toggleSidebar() {
        this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }
}
