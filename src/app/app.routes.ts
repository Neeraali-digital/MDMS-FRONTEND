import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Colleges } from './pages/colleges/colleges';
import { Blog } from './pages/blog/blog';
import { Vlog } from './pages/vlog/vlog';
import { Faq } from './pages/faq/faq';
import { GenericPageComponent } from './pages/generic-page/generic-page.component';
import { CollegeDetailComponent } from './pages/college-detail/college-detail';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminCollegesComponent } from './pages/admin/admin-colleges/admin-colleges.component';
import { AdminEnquiriesComponent } from './pages/admin/admin-enquiries/admin-enquiries.component';
import { AdminBlogComponent } from './pages/admin/admin-blog/admin-blog.component';
import { AdminVlogComponent } from './pages/admin/admin-vlog/admin-vlog.component';
import { AdminFaqComponent } from './pages/admin/admin-faq/admin-faq.component';
import { AdminNewsComponent } from './pages/admin/admin-news/admin-news.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { AdminCollegeFormComponent } from './pages/admin-college-form/admin-college-form.component';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';

export const routes: Routes = [
    // Admin Routes (Independent of User Layout)
    { path: 'admin/login', component: AdminLoginComponent },
    {
        path: 'admin',
        component: AdminLayoutComponent,
        children: [
            { path: 'dashboard', component: AdminDashboardComponent },
            { path: 'colleges', component: AdminCollegesComponent },
            { path: 'enquiries', component: AdminEnquiriesComponent },
            { path: 'blog', component: AdminBlogComponent },
            { path: 'vlog', component: AdminVlogComponent },
            { path: 'faq', component: AdminFaqComponent },
            { path: 'news', component: AdminNewsComponent },
            { path: 'college/new', component: AdminCollegeFormComponent },
            { path: 'college/:slug', component: AdminCollegeFormComponent },
            // Add more child routes here as needed
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },

    // User Layout Routes
    {
        path: '',
        component: UserLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            // Courses
            { path: 'course/:id', component: GenericPageComponent },
            // Colleges
            { path: 'colleges', component: Colleges },
            { path: 'colleges/:id', component: CollegeDetailComponent },
            // Sub Tabs
            { path: 'blog', component: Blog },
            { path: 'vlog', component: Vlog },
            { path: 'faq', component: Faq },
            // News
            { path: 'news/:id', component: GenericPageComponent },
        ]
    },

    { path: '**', redirectTo: '' }
];
