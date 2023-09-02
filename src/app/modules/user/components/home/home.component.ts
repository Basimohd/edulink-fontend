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
      quote: '“It’s Truly The Best Solution For Me”',
      content: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.',
      author: 'Alfred Helmerich',
      position: 'Executive Training Manager'
    },
    {
      quote: '“It’s Truly Tahe Best Solution For Me”',
      content: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.',
      author: 'Alfred Helmerich',
      position: 'Executive Training Manager'
    },
    // Add more testimonial objects here
  ];

  currentSlideIndex = 0;

  prevSlide() {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.testimonials.length;
  }
}