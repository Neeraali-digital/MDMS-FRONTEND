import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
    selector: 'app-admin-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
    @ViewChild('statsChart') statsChart!: ElementRef;

    collegesCount = 0;
    enquiriesCount = 0;

    stats = [
        { label: 'Total Colleges', value: '12', icon: '🏫', color: 'blue' },
        { label: 'Pending Enquiries', value: '5', icon: '📩', color: 'orange' },
        { label: 'Total Blogs', value: '24', icon: '📝', color: 'green' },
        { label: 'Active News', value: '8', icon: '📰', color: 'purple' },
    ];

    recentEnquiries: any[] = [];

    constructor(private api: ApiService) { }

    ngOnInit() {
        this.api.getColleges().subscribe(data => {
            this.collegesCount = data.length;
            this.stats[0].value = this.collegesCount.toString();
        });
        this.api.getEnquiries().subscribe(data => {
            this.enquiriesCount = data.length;
            this.stats[1].value = this.enquiriesCount.toString();
            this.recentEnquiries = data.slice(0, 5);
        });
    }

    ngAfterViewInit() {
        this.initChart();
    }

    initChart() {
        const ctx = this.statsChart.nativeElement.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Enquiries 2026',
                    data: [12, 19, 3, 5, 2, 3],
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: false
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
}
