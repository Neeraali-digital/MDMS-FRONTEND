import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vlog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vlog.html',
  styleUrl: './vlog.scss',
})
export class Vlog {
  videos = [
    {
      title: 'A Day in the Life of an MBBS Student',
      thumbnail: 'https://images.unsplash.com/photo-1576091160550-2187d80afea2?auto=format&fit=crop&q=80&w=600',
      duration: '12:45',
      views: '15K',
      date: '2 weeks ago'
    },
    {
      title: 'Campus Tour: AIIMS New Delhi',
      thumbnail: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600',
      duration: '08:20',
      views: '54K',
      date: '1 months ago'
    },
    {
      title: 'How to Choose Your MD Specialization?',
      thumbnail: 'https://images.unsplash.com/photo-1628348070889-cb656235b4eb?auto=format&fit=crop&q=80&w=600',
      duration: '15:10',
      views: '8K',
      date: '3 months ago'
    },
    {
      title: 'NEET Result Reaction & Analysis',
      thumbnail: 'https://images.unsplash.com/photo-1427504746086-61e829dce4a9?auto=format&fit=crop&q=80&w=600',
      duration: '10:05',
      views: '22K',
      date: '5 months ago'
    }
  ];
}
