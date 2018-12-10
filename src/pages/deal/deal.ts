import { LoginPage } from './../login/login';
import { HelperProvider } from './../../providers/helper/helper';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { ApiProvider } from '../../providers/api/api';
import { map } from 'rxjs/operators';

/**
 * Generated class for the DealPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deal',
  templateUrl: 'deal.html',
})
export class DealPage {


  constructor(public navCtrl: NavController,private helper:HelperProvider, private api:ApiProvider,
     public navParams: NavParams, private iab:InAppBrowser) {}

  deal;
  ionViewDidLoad() {
    console.log('ionViewDidLoad DealPage');
    console.log(this.navParams.data);
    if(this.navParams.data.user == undefined){
      this.deal  = this.navParams.data;
    }else{
      this.deal = this.navParams.data.deal;
      this.user = this.navParams.data.user;
    }

  }

  goBack(){
    this.navCtrl.pop();
  }

  go(){
    //time to check the type of the dealType i.e  instore || online

    if(this.deal.dealType == 'instore'){
      switch(this.deal.couponType){
        case 'qrcode': {
          this.navCtrl.push('QrCouponPage', this.deal);
          break;

        }
        case 'barcode':{
          this.navCtrl.push('BarcodeCouponPage', this.deal);
          break;


        }
      }
    }else if(this.deal.dealType == 'online'){
      //open this deal in the URL
     window.open(this.deal.url, '_blank', 'location=yes');

    }
  }


goFavorite(){
  if(localStorage.getItem('uid') !== null){
    this.addToFavorites();
  }else{
    this.helper.presentConfirm('LOGIN', 'Create an Account or login ?','LOGIN',()=>{
      this.navCtrl.setRoot(LoginPage);

    },'CANCEL',()=>{

    })

  }
}


  user;
  updateProfile(uid, dealId){

      if(this.user.deals){
        this.user.deals.push(dealId);
      }else{
        this.user.deals = [dealId];
      }
     return this.api.updateProfile(uid, this.user).then(()=>{
        console.log('user deals added to profile');
      });
  }



  addToFavorites(){
    let dx = this.deal;
    dx.userId = localStorage.getItem('uid');
    dx.dealId = dx.id;
    // Time to update deal.
    this.updateProfile(localStorage.getItem('uid'), dx.dealId)

    this.helper.toast('Deal added to favorites.');
    let d = dx;
    this.api.addFavorite(d).then(res=>{
      console.log('added to favorite list....');
      this.deal.liked = true;

    })
// FLUTTER - ECA

  }



  updateRemoveProfile(uid, dealId){
    var index = this.user.deals.indexOf(dealId);
    if (index > -1) {
      this.user.deals.splice(index, 1);
    }
    console.log(this.user);
   return this.api.updateProfile(uid, this.user).then(()=>{
      console.log('user deals removed profile');
    });
}



rnx;
  removeFromFavorite(){
    this.deal.liked = false;
    let deal = this.deal;
    console.log(deal);
    deal.userId = localStorage.getItem('uid');
    deal.dealId = deal.id;
    console.log(`DEAL ID is : ${deal.id}`)

    // Time to update deal.
    this.updateRemoveProfile(localStorage.getItem('uid'), deal.dealId)
    this.api.getFavoriteDealWithId(deal.dealId) .pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
          ).subscribe(res=>{
            this.rnx = res;
            console.log(this.rnx);
            if(this.rnx[0]){
              this.deleteDeal(this.rnx[0]).then(()=>{
              })
            }




    })

    this.helper.toast('Deal removed from favorites.');
  }


  deleteDeal(data){
    if(data){
      console.log('0 index is..')
      console.log(data);
     return this.api.removeFavorite(data.id).then(()=>{
        console.log('deal removed from list...');
      });
    }

  }






}
