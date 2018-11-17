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
    //set dummy ID
    console.log(localStorage.getItem('uid'))
  }



  /* ----------------- USERS ------------ */
  createProfile(uid, data){
    return this.afs.doc('users/'+uid).set(data);
  }
  getProfile(uid){
    return this.afs.doc('users/'+ uid).valueChanges();
  }
  updateProfile(uid, info){
    return this.afs.doc('users/'+uid).update(info);
  }



  /* ---------------DEALS--------------- */


  // ADD DEALS

  getDeals(){
    return this.afs.collection('deals').snapshotChanges();

  }
  getDeal(id){
    return this.afs.doc('deals').valueChanges();
  }
  getUserDeals(id){
    return this.afs.collection('deals', ref=> ref.where('userId','==',id)).snapshotChanges();
  }
  getApprovedDeals(){
    return this.afs.collection('deals', ref=> ref.where('approved','==','approved')).snapshotChanges();
  }

  addDeal(data){
    return this.afs.collection('deals').add(data);

  }
  updateDeal(id,data){
    return this.afs.doc('deals/'+id).update(data);
  }

deleteDeal(id){
  return this.afs.doc('deals/'+id).delete();
}



/* --------------- CATEGORIES -------------------- */


getAllCategories(){
  return this.afs.collection('categories').snapshotChanges();
}
getOnlineCategories(){
  return this.afs.collection('categories', ref=> ref.where('type','==','online')).snapshotChanges();
}
getInstoreCategories(){
  return this.afs.collection('categories', ref=> ref.where('type','==','instore')).snapshotChanges();
}


/* --------------- FAVORITES -------------------- */
getUserFavorites(){
  return this.afs.collection('favorites', ref=> ref.where('userId','==',localStorage.getItem('uid'))).snapshotChanges();
}

addFavorite(data){
  return this.afs.collection('favorites').add(data);
}


/* INIVTES */

getInvites(){
  let id = localStorage.getItem('uid');
  return this.afs.collection('invites', ref=> ref.where('userId','==',id)).snapshotChanges();
}
getInvite(id){
  return this.afs.doc('invites/'+id).valueChanges();
}
approveInvite(id, status){ /*  approved | pending  */
  return this.afs.doc('invites/'+id).update({
    status: status
  });
}

deleteInvite(id){
  return this.afs.doc('invites/'+id).delete();
}
updateInvite(id, data){
  return this.afs.doc('invites/'+id).update(data);
}



}
