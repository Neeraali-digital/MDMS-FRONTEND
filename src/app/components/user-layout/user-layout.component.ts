import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
    selector: 'app-user-layout',
    standalone: true,
    imports: [CommonModule, RouterModule, HeaderComponent],
    templateUrl: './user-layout.component.html',
    styleUrl: './user-layout.component.scss'
})
export class UserLayoutComponent { }
