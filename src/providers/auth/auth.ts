import { Injectable } from '@angular/core';
import { FirebaseAuth } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';

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
  return localStorage.getItem('uid')
}

changePassword(password, newPassword){
  return this.afAuth.auth.confirmPasswordReset(password, newPassword).then(res=>{
    console.log(`password updated`)
  })
}







}
