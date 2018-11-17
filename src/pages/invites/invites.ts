import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { map } from 'rxjs/operators';

/**
 * Generated class for the InvitesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invites',
  templateUrl: 'invites.html',
})
export class InvitesPage { goBack(){ this.navCtrl.pop(); }

  constructor(public navCtrl: NavController, private api:ApiProvider,
    public navParams: NavParams) {
  }
  user;
  invites;

  ionViewDidLoad() {
    console.log('ionViewDidLoad InvitesPage');
    this.user = this.navParams.data;
  }



  handleInvite(item, status){
    this.api.updateDeal(item.id, {
      status:status,
      userId: localStorage.getItem('uid'),
      userName: this.user.name,
    })
  }

  getInvites(){
    this.api.getInvites().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
          ).subscribe(resp=>{
            this.invites = resp;
          })
  }


}
