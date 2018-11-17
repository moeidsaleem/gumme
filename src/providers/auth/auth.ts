import { Injectable } from '@angular/core';
import { FirebaseAuth } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { HelperProvider } from '../helper/helper';
import { NavParams } from 'ionic-angular';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {




  user;
  constructor(private afAuth:AngularFireAuth) {
    console.log('Hello AuthProvider Provider');

  }


  login(email, password){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  signup(user){
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  logout(){
    localStorage.clear();
  }

saveToken(uid){
     localStorage.setItem('uid', uid);
}

getToken(){
  return localStorage.getItem('uid');
}

changePassword(email,oldPassword, newPassword){

 return this.afAuth.auth.signInWithEmailAndPassword(email, oldPassword).then(u=>{
   let currentUser = u.user;
   return currentUser.updatePassword(newPassword).then(res=>{}, err=> console.log(err.message))
 })
}

deleteAccount(email, password){
  return this.afAuth.auth.signInWithEmailAndPassword(email, password).then(u=>{
    let currentUser = u.user;
    return currentUser.delete()
  })
}







}
