import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { map } from 'rxjs/operators';

/**
 * Generated class for the FetchdataPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fetchdata',
  templateUrl: 'fetchdata.html',
})
export class FetchdataPage {

  constructor(public navCtrl: NavController, private api:ApiProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FetchdataPage');
    this.getMyDeals();
  }



  deals;

  getMyDeals(){
    let id = localStorage.getItem('uid')
    return this.api.getUserDeals(id).pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).subscribe(resp=>{
      this.deals = resp;
      console.log(this.deals);

    })
  }

}
