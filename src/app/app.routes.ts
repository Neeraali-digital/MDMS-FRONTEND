import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Colleges } from './pages/colleges/colleges';
import { Blog } from './pages/blog/blog';
import { Vlog } from './pages/vlog/vlog';
import { Faq } from './pages/faq/faq';
import { GenericPageComponent } from './pages/generic-page/generic-page.component';
import { CollegeDetailComponent } from './pages/college-detail/college-detail';

export const routes: Routes = [
    { path: '', component: HomeComponent },

    // Courses (All handled by GenericPageComponent for design consistency)
    { path: 'course/:id', component: GenericPageComponent },

    // Colleges
    { path: 'colleges', component: Colleges },
    { path: 'colleges/:id', component: CollegeDetailComponent },

    // Sub Tabs
    { path: 'blog', component: Blog },
    { path: 'vlog', component: Vlog },
    { path: 'faq', component: Faq },

    // Generic/Other courses fallback
    { path: 'course/:id', component: GenericPageComponent },
    // News specific route if needed or use generic
    { path: 'news/:id', component: GenericPageComponent },

    { path: '**', redirectTo: '' }
];
