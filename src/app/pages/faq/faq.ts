import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.html',
  styleUrl: './faq.scss',
})
export class Faq {
  faqs = [
    {
      question: 'What is the eligibility for MD/MS in India?',
      answer: 'Candidates must hold an MBBS degree from a recognized institute and must have completed their mandatory one-year internship. They must also qualify the NEET PG entrance exam.',
      isOpen: true
    },
    {
      question: 'How many seats are there in AIIMS Delhi?',
      answer: 'The seat matrix differs every year. Generally, there are around 125 MBBS seats. For PG courses, it varies by department.',
      isOpen: false
    },
    {
      question: 'Is NEET mandatory for private medical colleges?',
      answer: 'Yes, NEET qualification is mandatory for admission to MBBS, BDS, and PG medical courses in all government and private medical colleges in India.',
      isOpen: false
    },
    {
      question: 'What is the counselling process for Deemed Universities?',
      answer: 'The counselling for Deemed Universities is conducted by the MCC (Medical Counselling Committee) on an All India basis.',
      isOpen: false
    }
  ];

  toggle(index: number) {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
    // Optional: Close others
    // this.faqs.forEach((item, i) => { if(i !== index) item.isOpen = false; });
  }
}
