import { HelperProvider } from './../../providers/helper/helper';
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

  constructor(public navCtrl: NavController,private api:ApiProvider,private helper:HelperProvider,
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
    this.getUser();

    this.api.getAllCategories().pipe(
      map(actions=> actions.map(a=>{
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        let d = this.user.categories.find(element =>{
          return element === id;
        })
        let liked=false;
        if(d !== undefined){
          liked = true;
        }

        return {id,liked, ...data}
      }))
    ).subscribe(resp=>{
      console.log(resp);
      this.deals = resp;
      this.online = this.deals.filter(val => val.type =='online');
      this.instore = this.deals.filter(val => val.type =='instore');
    });
  }

user;

  getUser(){
    return this.api.getProfile(localStorage.getItem('uid')).subscribe(resp=>{
      this.user = resp;
    })
  }


  findCategory(categoryId){
    if(this.user.categories){
     let d= this.user.categories.find((element)=>{
        return element === categoryId;
      });
      if(d){
        return true;
      }else{
        return false;
      }
    }else{
      return true;
    }
  }


  removeCategory(item){
    let index = this.user.categories.indexOf(item);
    if(index> -1){
      this.user.categories.splice(index,1);
      this.updateProfile();
      this.getCategories();
    }
  }

  addCategory(categoryId){
    console.log(this.user);
    if(this.user.categories && this.user.categories.length >0){
// add - Category
this.user.categories.push(categoryId);
this.updateProfile();
this.getCategories();

    }else{
     this.user.categories.push(categoryId);
     this.updateProfile();
     this.getCategories();
    }

  }

  updateProfile(){
    return this.api.updateProfile(localStorage.getItem('uid'), this.user);
  }


}
