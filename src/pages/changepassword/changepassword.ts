import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the ChangepasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepassword',
  templateUrl: 'changepassword.html',
})
export class ChangepasswordPage {

  constructor(public navCtrl: NavController,private auth:AuthProvider,private api:ApiProvider,
     public navParams: NavParams) {
  }
  user;
  newPass;
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepasswordPage');
    this.user = this.navParams.data;
  }



  ChangePassword(newPassword){
    this.auth.changePassword(this.user.password, newPassword);

  }
}
