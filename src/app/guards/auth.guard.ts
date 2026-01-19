import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { map, take } from 'rxjs';

export const authGuard = () => {
    const api = inject(ApiService);
    const router = inject(Router);

    return api.isAuthenticated$.pipe(
        take(1),
        map(isAuthenticated => {
            if (isAuthenticated) {
                return true;
            } else {
                router.navigate(['/admin/login']);
                return false;
            }
        })
    );
};
