import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ApiProvider } from '../../providers/api/api';
import { HelperProvider } from '../../providers/helper/helper';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage{

  constructor(public navCtrl: NavController, private auth:AuthProvider,private api:ApiProvider,private helper:HelperProvider,
    public navParams: NavParams) {
  }

  user={
    email:'',
    phone:'',
    password:'',
    name:'',
    categories:[],
    deals:[]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  err;
  register(){
    this.helper.load();
    this.auth.signup(this.user).then(resp=>{
      console.log(resp.user.uid);
      this.api.createProfile(resp.user.uid, this.user).then(r=>{
        this.auth.saveToken(resp.user.uid);
        this.navCtrl.setRoot(TabsPage).then(()=> {
          this.helper.dismiss();
          this.helper.toast(`Welcome!`)
        })
      })

    },err=>{
      this.err = err.message;
      this.helper.dismiss();
    })
  }
  goLogin(){
    this.navCtrl.push(LoginPage);
  }
}
