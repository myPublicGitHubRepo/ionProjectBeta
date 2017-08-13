import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Network } from '@ionic-native/network';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

import { Language } from '../../interfaces/language.interface';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  languagesPath: string = "https://splinxs.com/fullLangs.json";

  languages: Language[] = [];

  constructor(public navCtrl: NavController, private http: Http, private network: Network) {
    this.monitorConnect();

    if (network.type != "null") this.loadLanguages();

  }

  loadLanguages() {
    this.http.get(this.languagesPath).map(res => res.json()).subscribe(data => {
      //this.languages = data;
      console.log(data);
      for (let lang of data) {

        //set german isOnline to false for testing purpose
        if (lang.name == "German") this.languages.push({ name: lang.name, nativeName: lang.nativeName, code: lang.code, isOnline: false });
        else this.languages.push({ name: lang.name, nativeName: lang.nativeName, code: lang.code, isOnline: true });
      }
    });
  }
  goToLanguages() {
    this.navCtrl.push("LanguagesPage", this.languages);
  }

  goToLocation() {
    this.navCtrl.push("LocationPage");
  }

  monitorConnect() {
    // watch network for a connection
    this.network.onConnect().subscribe(() => {
      if (this.languages.length <= 0) this.loadLanguages();
    });
  }

}
