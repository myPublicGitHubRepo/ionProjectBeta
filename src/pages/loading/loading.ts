import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TouristParams } from './../../interfaces/touristParams.interface';


/**
 * Generated class for the LoadingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html',
})
export class LoadingPage {
  tp: TouristParams = null;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tp = navParams.data;
  }

  ionViewDidLoad() {
    console.log("Tourist params: ");
    console.log(this.tp);
  }

}
