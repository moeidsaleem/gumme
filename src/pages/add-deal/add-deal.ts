import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HelperProvider } from '../../providers/helper/helper';
import { map } from 'rxjs/operators';

/**
 * Generated class for the AddDealPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-deal',
  templateUrl: 'add-deal.html',
})
export class AddDealPage {


  user;
  categories;

  constructor(public navCtrl: NavController, private api:ApiProvider,private helper:HelperProvider,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddDealPage');
    this.getCategories();
  }

  submit(){
    let d = new Date();
    this.deal.timestamp =d.toISOString();
    this.deal.userId = localStorage.getItem('uid');
    this.deal = {...this.deal, ...this.selectedCategory};
    console.log(this.deal);

    this.helper.load();
    console.log(this.deal);
    this.api.addDeal(this.deal).then(resp=>{
      console.log(resp);
      this.helper.toast(`Deal sent for approval from admin!`);
      this.navCtrl.pop().then(()=> this.helper.dismiss());
    })
  }

  deal={
    title:'',
    photo:'',
    approved:'pending',
    brand:'',
    brandPhone:'',
    category:'',
    categoryId:'',
    code:'',
    couponType:'online',
    dealType:'instore',
    description:'',
    startDate:'',
    endDate:'',
    location:'',
    price:'',
    url:'',
    userName:'',
    userId:'',
    userPhoto:'',
    timestamp:'',
  }

  updateProfile(){
    // update-profile .....,,,

  }

  getCategories(){
    this.api.getOnlineCategories().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).subscribe(resp=>{
      this.categories = resp;
    })
  }

  submitData(data,e){
    e.preventDefault();
    console.log(data);
//    return this.api.addDeal(data)
  }


  selectedCategory ={};
  selectChange(e){
    let obj =JSON.parse(e);
    this.selectedCategory = obj;


  }
}
