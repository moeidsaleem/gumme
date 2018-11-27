import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { SimpleDealsPage } from '../pages/simple-deals/simple-deals';
import { FavoritePage } from '../pages/favorite/favorite';
import { SettingsPage } from '../pages/settings/settings';
import { ProfilePage } from '../pages/profile/profile';
import { HelperProvider } from '../providers/helper/helper';
import { HomePage } from '../pages/home/home';
import { CategoryPage } from '../pages/category/category';
import { ApiProvider } from '../providers/api/api';
import { AuthProvider } from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = SimpleDealsPage;
  @ViewChild(Nav) nav: Nav;
  showSidebar=false;
  uid;
  constructor(platform: Platform, statusBar: StatusBar,helper:HelperProvider, splashScreen: SplashScreen,
    androidPermissions: AndroidPermissions, private api:ApiProvider, private auth:AuthProvider) {
    platform.ready().then(() => {
androidPermissions.checkPermission(androidPermissions.PERMISSION.CAMERA).then(
  result => console.log('Has permission?',result.hasPermission),
  err =>androidPermissions.requestPermission(androidPermissions.PERMISSION.CAMERA) ).catch(err=> console.log(`android permission error`))
androidPermissions.requestPermissions([androidPermissions.PERMISSION.CAMERA,androidPermissions.PERMISSION.GET_ACCOUNTS])
.catch(err=> console.log(`Cordova error!`))

      this.uid= localStorage.getItem('uid');

      if(this.uid === null){
        this.rootPage = SimpleDealsPage;
      }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  goBack(){
    this.nav.pop();
 }

tab1Root = HomePage;
tab2Root = CategoryPage;
tab3Root = FavoritePage;
tab4Root = ProfilePage;


  user;

  goLogin(){
    this.nav.setRoot(LoginPage).then(()=>{
      this.showSidebar = !this.showSidebar;
    });
  }

  getUser(){
    this.api.getProfile(localStorage.getItem('uid')).subscribe(response=>{
      this.user = response;
    })
  }

  goHome(){
    this.nav.setRoot(TabsPage);
  }
  goSaved(){
    this.nav.push(FavoritePage);
  }
  goSettings(){
    this.nav.push(SettingsPage);

  }

  goProfile(){
    this.nav.push(ProfilePage);

  }
  // logout(){
  //   this.helper.presentConfirm('Logout', 'Are you sure you want to logout',
  //   'Logout', ()=>{
  //     //on success
  //     this.helper.load();
  //     this.auth.logout();
  //     this.nav.setRoot(LoginPage).then(()=> this.helper.dismiss());
  //   }
  //   ,'Cancel',()=>{
  //     //oncancel

  //   })

  // }
}
