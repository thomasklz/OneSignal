import { Injectable, EventEmitter, OnInit } from '@angular/core';
import OneSignal from 'onesignal-cordova-plugin';
import { Storage } from '@ionic/storage-angular';
import {  } from 'stream';

@Injectable({
  providedIn: 'root'
})

export class OnesiganlService implements OnInit {
  arrayNotification:any[]=[];

  pushListener = new EventEmitter();
  constructor(private storage: Storage) {
    this.loadMessage();
    this.storage.create();
  }
  async ngOnInit() {
  await this.storage.create();
 }

  OneSignalInit(): void {
    OneSignal.setAppId('19f88d90-b59f-478a-9bec-b1aac0b46a36');
    OneSignal.setNotificationOpenedHandler((openedEvent) => {
      const { notification } = openedEvent;
        this.addNotificacion(notification);
        console.log("open: "+ notification.additionalData);
        console.log("open1: "+ JSON.stringify(notification.additionalData));
      })

    OneSignal.setNotificationWillShowInForegroundHandler(
      (notificationReceivedEvent) => {
        let notification = notificationReceivedEvent.getNotification();
       // const data = notification.additionalData;
        this.addNotificacion(notification);
       // console.log("data"+data);
        notificationReceivedEvent.complete(notification);
      }
    );

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

  deleteStorage(){
    this.storage.clear();
  }
}
