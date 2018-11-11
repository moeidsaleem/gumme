import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { timeoutWith } from 'rxjs/operators';
import { ApiProvider } from '../../providers/api/api';
import { AuthProvider } from '../../providers/auth/auth';
import { HelperProvider } from '../../providers/helper/helper';
import { LoginPage } from '../login/login';

/**
 * Generated class for the UpdateprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-updateprofile',
  templateUrl: 'updateprofile.html',
})
export class UpdateprofilePage {

  constructor(private api:ApiProvider,private helper:HelperProvider, private auth:AuthProvider,
    public navCtrl: NavController, public navParams: NavParams) {
  }


  user;
  userx;
  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateprofilePage');
    let data = this.navParams.data;
    if(data !=={}){
      this.user = this.navParams.data;
      this.userx = this.user;
    }else{
      this.api.getProfile(localStorage.getItem('uid')).subscribe(resp=>{
        this.user = resp;
        this.userx = this.user;
        console.log(this.user);

      })
    }
  }




  updateProfile(){
    this.api.updateProfile(localStorage.getItem('uid'), this.user).then(resp=>{
      this.helper.toast(`Profile updated successfully.`)
    },err=>this.helper.toast(`Error Upating Profile.`))
  }



  logout(){
    this.helper.load();
    localStorage.clear();
    this.navCtrl.setRoot(LoginPage).then(res=>{
      this.helper.dismiss();
    })
  }
}
