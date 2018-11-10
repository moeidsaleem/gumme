import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { NgxQRCodeModule } from 'ngx-qrcode2';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private iab:InAppBrowser) {}

  deal
  ionViewDidLoad() {
    console.log('ionViewDidLoad DealPage');
    console.log(this.navParams.data);
    this.deal = this.navParams.data;
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
      const browser=this.iab.create(this.deal.url);
      browser.show()
    }
  }

}
