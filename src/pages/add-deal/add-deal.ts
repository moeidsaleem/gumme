import {Camera, CameraOptions } from '@ionic-native/camera';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { HelperProvider } from '../../providers/helper/helper';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

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
export class AddDealPage { goBack(){ this.navCtrl.pop(); }

photo

  user;
  categories;

  constructor(public navCtrl: NavController,private camera: Camera,
     private api:ApiProvider,private helper:HelperProvider,
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
    });
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
    dealType:'online',
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


 options: CameraOptions = {
  quality: 100,
  destinationType: this.camera.DestinationType.FILE_URI,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE
}


  takePicture(){
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.deal.photo = base64Image;
     }, (err) => {
      // Handle error
     });
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
