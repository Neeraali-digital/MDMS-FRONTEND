import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './admin-login.component.html',
    styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {
    username = '';
    password = '';
    error = '';

    constructor(private api: ApiService, private router: Router) { }

    login() {
        this.api.login({ username: this.username, password: this.password }).subscribe({
            next: () => {
                this.router.navigate(['/admin/dashboard']);
            },
            error: (err) => {
                this.error = 'Invalid credentials';
                console.error(err);
            }
        });
    }
}
