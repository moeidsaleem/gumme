import { LoginPage } from './../pages/login/login';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,androidPermissions: AndroidPermissions) {
    platform.ready().then(() => {

androidPermissions.checkPermission(androidPermissions.PERMISSION.CAMERA).then(
  result => console.log('Has permission?',result.hasPermission),
  err =>androidPermissions.requestPermission(androidPermissions.PERMISSION.CAMERA) ).catch(err=> console.log(`android permission error`))
androidPermissions.requestPermissions([androidPermissions.PERMISSION.CAMERA,androidPermissions.PERMISSION.GET_ACCOUNTS])
.catch(err=> console.log(`Cordova error!`))

      let id = localStorage.getItem('uid');

      if(id === null){
        this.rootPage = LoginPage;
      }

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
