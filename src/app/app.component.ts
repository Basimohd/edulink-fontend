import { Component } from '@angular/core';
import { LoadingService } from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public loader:LoadingService){}
  
  loading$ = this.loader.loading$;

  
  title = 'Edulink College-Management';
}
