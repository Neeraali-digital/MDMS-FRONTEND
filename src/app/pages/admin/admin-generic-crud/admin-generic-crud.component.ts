import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-generic-crud',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-page">
      <div class="page-header">
        <div class="left">
          <h1 class="page-title">{{ title }} Management</h1>
          <p class="page-subtitle">Manage your {{ title | lowercase }} content.</p>
        </div>
        <div class="right">
          <button class="btn btn-primary">+ Add New {{ title }}</button>
        </div>
      </div>

      <div class="table-card card">
        <div class="table-wrapper">
            <table class="modern-table" *ngIf="data.length > 0; else emptyState">
                <thead>
                    <tr>
                        <th *ngFor="let col of columns">{{ col.header }}</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="let item of data">
                        <td *ngFor="let col of columns">{{ item[col.key] }}</td>
                        <td>
                            <div class="action-buttons">
                                <button class="action-btn view">✎</button>
                                <button class="action-btn delete">🗑</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            
            <ng-template #emptyState>
                <div class="empty-state">
                    <div class="icon">📂</div>
                    <h3>No {{ title }} Found</h3>
                    <p>Start by creating your first {{ title | lowercase }} post.</p>
                </div>
            </ng-template>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @use "../../../styles/admin-shared" as shared;
    @include shared.admin-layout;
    
    .empty-state {
        padding: 4rem 2rem;
        text-align: center;
        color: #64748b;
        
        .icon { font-size: 3rem; margin-bottom: 1rem; opacity: 0.5; }
        h3 { color: #1e293b; margin-bottom: 0.5rem; }
    }
  `]
})
export class AdminGenericCrudComponent {
  @Input() title: string = 'Item';
  @Input() data: any[] = [];
  @Input() columns: { key: string, header: string }[] = [
    { key: 'title', header: 'Title' },
    { key: 'date', header: 'Date' },
    { key: 'status', header: 'Status' }
  ];
}
