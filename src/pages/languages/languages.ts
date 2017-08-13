import { Language } from './../../interfaces/language.interface';
import { TouristParams } from './../../interfaces/touristParams.interface';


import { Component } from '@angular/core';

import { trigger, state, style, transition, animate, group } from '@angular/animations';

import { FormControl } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/debounceTime';



//TODO delet this
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

const languageStorageKey = "addedLanguages";

@IonicPage()
@Component({
  selector: 'page-languages',
  templateUrl: 'languages.html',
  animations: [
    trigger('itemAnim', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('0.25s', style({
          opacity: 1,
        }))
      ]),
      transition(':leave', [
        animate('0.25s', style({
          opacity: 0,
          height: 0,
          minHeight: 0
        }))

      ])
    ])
  ]
})
export class LanguagesPage {


  languages: Language[] = [];
  filteredLanguages: Language[] = [];
  addedLanguages: Language[] = [];
  searchTerm: string = '';
  searchControl: FormControl;
  searching: any = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, http: Http) {

    this.loadAddedLanguagesFromLocalStorage();


    //TODO delet this and get from navparams
    http.get("https://splinxs.com/fullLangs.json").map(res => res.json()).subscribe(data => {

      //this.languages = data;
      console.log(data);
      for (let lang of data) {

        //set german isOnline to false for testing purpose
        if (lang.name == "German") this.languages.push({ name: lang.name, nativeName: lang.nativeName, code: lang.code, isOnline: false });
        else this.languages.push({ name: lang.name, nativeName: lang.nativeName, code: lang.code, isOnline: true });
      }
      this.languages = this.removeAddedlanguagesFromAvailableLanguages(this.languages);
      this.filteredLanguages = this.languages;
    });

    //TODO uncomment this
    //this.languages = navParams.data;
    //this.languages = this.removeAddedlanguagesFromAvailableLanguages(this.languages);
    //this.filteredLanguages = this.languages;
    this.searchControl = new FormControl();

    //TODO if a language is not online but is saved in the local storage, remove from it!!

  }
  ionViewDidLoad() {

    this.setFilteredItems();

    this.searchControl.valueChanges.debounceTime(500).subscribe(search => {

      this.searching = false;
      this.setFilteredItems();

    });


  }

  private addLanguage(lang: Language) {
    if (lang.isOnline) {
      this.languages = this.languages.filter(item => item !== lang);
      this.filteredLanguages = this.filteredLanguages.filter(item => item !== lang);
      setTimeout(() => {
        this.addedLanguages.push(lang);
      }, 250);
    }
    else {
      alert("You can't add this language because there is no guide online that spleaks bla bla bla")
    }

  }

  private removeLanguage(lang: Language) {
    //remove the language from the array
    this.addedLanguages = this.addedLanguages.filter(item => item !== lang);
    setTimeout(() => {
      this.languages.push(lang);
      this.filteredLanguages.push(lang);
    }, 250)
  }
  private onSearchInput() {
    this.searching = true;
  }

  private setFilteredItems() {
    this.filteredLanguages = this.filterItems(this.searchTerm);
  }


  private filterItems(searchTerm) {

    //remove duplicates from an array (compares Language.name)
    function arrayUnique(array): any {
      var a = array.concat();
      for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
          if (a[i].name === a[j].name)
            a.splice(j--, 1);
        }
      }
      return a;
    }

    let nativeNameLanguages = this.languages.filter((lang) => {
      return lang.nativeName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;

    });

    let nameLanguages = this.languages.filter((lang) => {
      return lang.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;

    });
    return arrayUnique(nameLanguages.concat(nativeNameLanguages));

  }


  nextPage() {
    this.saveAddedLanguagesInLocalStorage();
    let codes: string[] = [];
    for (let lang of this.addedLanguages) {
      codes.push(lang.code);
    }
    let tp: TouristParams = {
      name: "",
      langCodes: codes,
      lat: "",
      lng: "",
      chatOnly: true
    }
    this.navCtrl.push("LocationPage", tp)

  }

  removeAddedlanguagesFromAvailableLanguages(languages: Language[]): Language[] {
    //remove the added langauages from the passed array
    for (let lang of this.addedLanguages) {
      languages = languages.filter(item => item !== lang);
    }
    return languages;

  }

  saveAddedLanguagesInLocalStorage() {
    localStorage.setItem(languageStorageKey, JSON.stringify(this.addedLanguages));
    console.log("saved in local storeage");
  }

  loadAddedLanguagesFromLocalStorage() {
    this.addedLanguages = JSON.parse(localStorage.getItem(languageStorageKey));
    if (this.addedLanguages == null) {
      this.addedLanguages = [];
    }
  }

}
