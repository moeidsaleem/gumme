import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ApiProvider } from '../../providers/api/api';
import { HelperProvider } from '../../providers/helper/helper';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, private auth:AuthProvider,private api:ApiProvider,private helper:HelperProvider,
    public navParams: NavParams) {
  }

  user={
    email:'',
    password:''
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  err;
  login(){
    this.helper.load();
    this.auth.login(this.user.email, this.user.password).then(resp=>{
      this.auth.saveToken(resp.user.uid);
      this.navCtrl.setRoot(TabsPage).then(()=> {
        this.helper.dismiss();
        this.helper.toast(`Welcome!`)
      })
    },err=>{
      this.err = err.message;
      this.helper.dismiss();
    })
  }
  goRegister(){
    this.navCtrl.push(RegisterPage);
  }
}
