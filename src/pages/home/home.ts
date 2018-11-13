import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddDealPage } from '../add-deal/add-deal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  deals;
  user;
  constructor(public navCtrl: NavController,private api:ApiProvider) {
    this.getDeals();
  }




  addDeal(){
    console.log(`adding this deal`);
    this.navCtrl.push(AddDealPage);

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

getDeals(){
  this.api.getApprovedDeals().pipe(
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
    this.deals = resp;
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
