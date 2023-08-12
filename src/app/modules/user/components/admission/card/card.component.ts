import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Output() previousStepClicked = new EventEmitter();
  @Output() nextStepClicked = new EventEmitter();
  @Output() submitted = new EventEmitter();
  isFirstStep: boolean = false;
  isLastStep: boolean = false;
  
  constructor(private router: Router) { }

  ngOnInit() {
    const currentRoute = this.router.url;
    this.isFirstStep = currentRoute === '/admission/applicant-info';
    this.isLastStep = currentRoute === '/admission/confirmation'
}

  goToPreviousStep() {
    this.previousStepClicked.emit();
  }

  goToNextStep() {
    this.nextStepClicked.emit();
  }
  onSubmit() {
    this.submitted.emit();
  }
}
