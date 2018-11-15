import { Component } from '@angular/core';


import { HomePage } from '../home/home';
import {CategoryPage } from '../category/category'
import { ProfilePage } from '../profile/profile';
import { FavoritePage } from '../favorite/favorite';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
@Component({
  templateUrl: 'tabs.html',
  selector:'tabs-page',


})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CategoryPage;
  tab3Root = FavoritePage;
  tab4Root = ProfilePage;

  constructor(private navCtrl:NavController, private auth:AuthProvider) {

  }

  goHome(){
    this.navCtrl.push(HomePage);
  }
  goSaved(){
    this.navCtrl.push(FavoritePage);
  }
  goSettings(){

  }

  goProfile(){
    this.navCtrl.push(ProfilePage);

  }
  logout(){
    this.auth.logout();
  }
}
