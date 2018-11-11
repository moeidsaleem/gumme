import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { AuthProvider } from '../../providers/auth/auth';
import { HelperProvider } from '../../providers/helper/helper';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(public navCtrl: NavController, private helper:HelperProvider,
    private api:ApiProvider, private auth:AuthProvider,
    public navParams: NavParams) {
  }

  user;

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.api.getProfile(localStorage.getItem('uid')).subscribe(resp=>{
      console.log(resp);
      this.user = resp;
    })
  }



  goEdit(){
    this.navCtrl.push('UpdateprofilePage', this.user);
  }


  go(page:any){
   this.navCtrl.push(page, this.user);
  }

 showLogout(){
  // items check
  this.helper.presentConfirm('LOGOUT', 'Are you sure you want to logout?', 'LOGOUT',()=>{
    //logout

    this.auth.logout();
    this.navCtrl.setRoot(LoginPage);
  },'CANCEL',()=>{
    //cancel

  })
 }
}
