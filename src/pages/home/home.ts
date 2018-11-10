import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  deals;
  constructor(public navCtrl: NavController,private api:ApiProvider) {


    this.api.getApprovedDeals().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).subscribe(resp=>{
      console.log(resp);
      this.deals = resp;
    });

  }


show(x){
  console.log(x);
  this.navCtrl.push('DealPage',x);
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
