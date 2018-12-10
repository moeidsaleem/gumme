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

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    if(localStorage.getItem('uid') !==null){
      this.getProfile();
    }else{
      this.getDeals();
    }

  }



  goCategory(){
    this.navCtrl.push(CategoryPage);
  }



  addDeal(){
    console.log(`adding this deal`);
    this.navCtrl.push(AddDealPage);
    }

show(x){
  console.log(x);
  if(this.user){
    this.navCtrl.push('DealPage',{
      deal: x,
      user: this.user
    });
  }else{
    this.navCtrl.push('DealPage',x);
  }

}

userDeals:any;

getProfile(){
this.api.getProfile(localStorage.getItem('uid')).subscribe(resp=>{
  this.user =resp;
  this.userDeals = this.user.deals;

  this.getDeals();

});
}

getDeals(){
  this.api.getApprovedDeals().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      let liked = false;

      if(this.user && this.user.deals){
        let found = this.user.deals.find((element)=> {
          return element == id;
        })
        if(found){
          liked =true;
        }
      }

      return { id,liked, ...data };
    }))
  ).subscribe(resp=>{
    console.log(resp);
    this.deals = resp;

  });
}


}
