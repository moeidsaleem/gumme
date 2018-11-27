import { CategoryPage } from './../category/category';
import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddDealPage } from '../add-deal/add-deal';
import * as moment from 'moment';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage { goBack(){ this.navCtrl.pop(); }

  deals;
  user;
  constructor(public navCtrl: NavController,private menuCtrl:MenuController,
    private api:ApiProvider) {
    this.getDeals();
  }


  goCategory(){
    this.navCtrl.push(CategoryPage);
  }
  ionViewWillEnter() { this.menuCtrl.enable(true) }



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
});
}

getDeals(){
  this.api.getApprovedDeals().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;

      // let liked = false;
      // let found = this.user.likes.find((element)=> {
      //   return element.id == localStorage.getItem('uid')
      // })
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


}
