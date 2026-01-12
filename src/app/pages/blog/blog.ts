import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.html',
  styleUrl: './blog.scss',
})
export class Blog {
  posts = [
    {
      title: 'Top 10 Medical Colleges in India 2024',
      date: 'May 15, 2024',
      category: 'Rankings',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600',
      excerpt: 'Discover the top institutes for pursuing your medical dream this year based on NIRF and other ranking factors.'
    },
    {
      title: 'NEET PG Preparation Strategy',
      date: 'April 22, 2024',
      category: 'Exam Tips',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=600',
      excerpt: 'Crack NEET PG with these expert tips and a solid 6-month study plan designed for success.'
    },
    {
      title: 'Understanding the New NMC Guidelines',
      date: 'March 10, 2024',
      category: 'Updates',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600',
      excerpt: 'Everything you need to know about the latest notifications and changes introduced by the National Medical Commission.'
    }
  ];
}
