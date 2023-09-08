import { Component } from '@angular/core';
import { authService } from '../../services/auth.service';
import { PadStartPipe } from '../../../../common/pipes/pad-start.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  counts : any;
  constructor(
    private _authService:authService
  ){}

  ngOnInit(){
    this._authService.getHomeCount().subscribe((res)=>{
      this.counts = res
    })
  }
  testimonials = [
    {
      url:"https://images.pexels.com/photos/4342401/pexels-photo-4342401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      quote: '“Edulink College: A Beacon of Educational Excellence”',
      content: 'I have witnessed Edulink College transform lives through its dedication to academic excellence and holistic development. The institutions commitment to nurturing talent is truly commendable.',
      author: 'Dr. Samantha Mitchell',
      position: 'Principal, Edulink College'
    },
    {
      url:"../../../../../assets/Images/principal.png",
      quote: '“Edulink: Shaping Future Leaders with Distinction”',
      content: 'Edulink College stands as a paragon of educational institutions, molding students into confident and capable leaders. Its innovative curriculum and devoted faculty set a benchmark for excellence.',
      author: 'Prof. Benjamin Davidson',
      position: 'Dean, Edulink College'
    },
    {
      url:"https://images.pexels.com/photos/6326377/pexels-photo-6326377.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      quote: '“Edulink College: Fostering Knowledge and Innovation”',
      content: 'Edulink College has consistently demonstrated a commitment to fostering a culture of knowledge and innovation. Its a privilege to lead an institution that empowers students to excel in their chosen fields.',
      author: 'Dr. Olivia Thompson',
      position: 'Director, Edulink College'
    }
  ];

  currentSlideIndex = 0;

  prevSlide() {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.testimonials.length;
  }
}