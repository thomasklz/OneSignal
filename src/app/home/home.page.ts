import { ApplicationRef, Component, OnInit } from '@angular/core';
import { OnesiganlService } from '../servicios/onesiganl.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  notifacion:any[]=[];
  constructor(private onesiganlService:OnesiganlService, 
    private applicationRef:ApplicationRef) {
      
  }
  ngOnInit(){
  this.onesiganlService.pushListener.subscribe((noti:any) =>{
    console.log('Cargar mensajes de ngOnInit');
    this.notifacion.unshift(noti);
    this.applicationRef.tick();
  })
  }

  async ionViewWillEnter(){
    console.log('Cargar mensajes de ionViewWillEnter');
    this.notifacion= await this.onesiganlService.getMessage();
  }
  delete(){
    this.notifacion.length=0;
    this.onesiganlService.deleteStorage();
  }
}
