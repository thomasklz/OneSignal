import { Injectable, EventEmitter, OnInit } from '@angular/core';
import OneSignal from 'onesignal-cordova-plugin';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})

export class OnesiganlService  {
  arrayNotification:any[]=[];

  pushListener = new EventEmitter();
  constructor(private storage: Storage) {
    this.createStorage();
    this.loadMessage();
  }
  async createStorage() {
  await this.storage.create();
 }



 async OneSignalInit(){
    OneSignal.setAppId('19f88d90-b59f-478a-9bec-b1aac0b46a36');

    OneSignal.setNotificationOpenedHandler((openedEvent) => {
      const { notification } = openedEvent;
        this.addNotificacion(notification);
      })

    OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent) => {
        let notification = notificationReceivedEvent.getNotification();
        this.addNotificacion(notification);
        notificationReceivedEvent.complete(notification);
      }
    );


    OneSignal.getDeviceState((response) => {
      console.log(response.userId);
    })
    
    OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
      console.log('User accepted notifications: ' + accepted);
    });
  }


  
  addNotificacion(noti:any){
    const existePush= this.arrayNotification.find(mensaje=> mensaje.notificationId === noti.notificationId);
    if(existePush){
        return;
    }
    this.arrayNotification.unshift(noti);
    //emite el observable
    this.pushListener.emit(noti);
    this.saveMessage();
  }

  saveMessage(){
    this.storage.set('notification',this.arrayNotification);
  }

  async loadMessage(){
    this.arrayNotification= await this.storage.get('notification') || [];
     return  this.arrayNotification;
  };
  async getMessage(){
    await this.loadMessage();
    return [...this.arrayNotification];
  }
 async deleteStorage(){
    await this.storage.clear();
    this.arrayNotification=[];
    this.saveMessage();
  }
}
