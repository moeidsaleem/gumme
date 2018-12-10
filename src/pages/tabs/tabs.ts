import { Component } from '@angular/core';


import { HomePage } from '../home/home';
import {CategoryPage } from '../category/category'
import { ProfilePage } from '../profile/profile';
import { FavoritePage } from '../favorite/favorite';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { HelperProvider } from '../../providers/helper/helper';
import { ApiProvider } from '../../providers/api/api';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html',
  selector:'tabs-page',


})
export class TabsPage {
  constructor(private navCtrl:NavController,private helper:HelperProvider,private api:ApiProvider,
     private auth:AuthProvider) {

  }

uid;
rootPage;



  ionViewDidEnter(){
    this.getUser();
    this.uid= localStorage.getItem('uid');
    if(this.uid !== null){
      this.rootPage = HomePage;
    }else {
      this.rootPage = HomePage;
    }
  }

  goBack(){
    this.navCtrl.pop();
 }

tab1Root = HomePage;
tab2Root = CategoryPage;
tab3Root = FavoritePage;
tab4Root = ProfilePage;

  user;


  getUser(){
    this.api.getProfile(localStorage.getItem('uid')).subscribe(response=>{
      this.user = response;
    })
  }

  goHome(){
    this.navCtrl.setRoot(TabsPage);
  }
  goSaved(){
    this.navCtrl.push(FavoritePage);
  }
  goSettings(){
    this.navCtrl.push(SettingsPage);
  }
  goLogin(){
    this.navCtrl.setRoot(LoginPage);
  }

  goProfile(){
    this.navCtrl.push(ProfilePage);

  }
  logout(){
    this.helper.presentConfirm('Logout', 'Are you sure you want to logout',
    'Logout', ()=>{
      //on success
      this.helper.load();
      this.auth.logout();
      this.navCtrl.setRoot(LoginPage).then(()=> this.helper.dismiss());
    },'Cancel',()=>{
      //oncancel

    })

  }
}
