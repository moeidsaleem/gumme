import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { map } from 'rxjs/operators';

/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  constructor(public navCtrl: NavController,private api:ApiProvider,
     public navParams: NavParams) {
  }

  deals;
  online;
  instore;
  segment='all'


  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');

/* now we have the deals. */
this.getCategories();
  }



  getCategories(){
    this.api.getAllCategories().pipe(
      map(actions=> actions.map(a=>{
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data}
      }))
    ).subscribe(resp=>{
      console.log(resp);
      this.deals = resp;
      this.online = this.deals.filter(val => val.type =='online');
      this.instore = this.deals.filter(val => val.type =='instore');
    });
  }





}
