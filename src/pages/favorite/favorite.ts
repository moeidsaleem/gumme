import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { map } from 'rxjs/operators';

/**
 * Generated class for the FavoritePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
})
export class FavoritePage{

  deals;
  favorites;
  user;
  constructor(public navCtrl: NavController,private api:ApiProvider) {
      this.getFavoritesDeals();
  }


show(x){
  console.log(x);
  this.navCtrl.push('DealPage',x);
}

getProfile(){
this.api.getProfile(localStorage.getItem('uid')).subscribe(resp=>{
  this.user =resp;
})
}

getFavoritesDeals(){
  this.api.getUserFavorites().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      // let liked = false;
      // let found = this.user.likes.find(function(element) {
      //   return element.id == localStorage.getItem('uid');  /* if dealID ==  */
      // });
      // if(found){
      //   liked =true;
      // }
      return { id, ...data };
    }))
  ).subscribe(resp=>{
    console.log(resp);
    this.favorites = resp;
  });
}
  // deals=[
  // {
  //   id:'',
  //   brand:'',
  //   brandContact:'',
  //   category:'',
  //   categoryId:'',
  //   code:'',
  //   description:'',
  //   endDate:'',
  //   startDate:'',
  //   link:'',
  //   photo:'',
  //   price:'',
  //   title:'',
  //   //instoreDeal
  //   dealType:'',  // > instore || online  (instore deal will be added by admininstrator.)
  //   couponType:'', // > qrcode || barcode || url
  //   approved:'' // pending , approved, cancel
  // }
  // ]

}
