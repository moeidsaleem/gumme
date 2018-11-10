import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  constructor(private afs:AngularFirestore) {
    console.log('Hello ApiProvider Provider');
  }




  /* ---------------DEALS--------------- */


  // ADD DEALS

  getDeals(){
    return this.afs.collection('deals').snapshotChanges();

  }
  getDeal(id){
    return this.afs.doc('deals').valueChanges();
  }
  getApprovedDeals(){
    return this.afs.collection('deals', ref=> ref.where('approved','==','approved')).snapshotChanges();
  }

  addDeal(id,data){
    return this.afs.doc('deals/'+id).set(data);

  }
  updateDeal(id,data){
    return this.afs.doc('deals/'+id).update(data);
  }

deleteDeal(id){
  return this.afs.doc('deals/'+id).delete();
}








}
