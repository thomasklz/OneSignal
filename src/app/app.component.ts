import { Component } from '@angular/core';
import { OnesiganlService } from './servicios/onesiganl.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  constructor(private onesiganlService:OnesiganlService) {
    this.onesiganlService.OneSignalInit();
  }
 
}
