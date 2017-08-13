import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TouristParams } from './../../interfaces/touristParams.interface';


/**
 * Generated class for the NamePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-name',
  templateUrl: 'name.html',
})
export class NamePage {
  audioVideoEnabled: boolean = false;
  name: string = "";
  tp: TouristParams = null;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tp = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NamePage');
  }

  nextPage() {
    if (this.name.length >= 1) {
      this.tp.name = this.name;
      this.tp.chatOnly = !this.audioVideoEnabled;
      this.navCtrl.push("LoadingPage", this.tp);
    }
    else {
      alert("please enter your name");
    }
  }
}
