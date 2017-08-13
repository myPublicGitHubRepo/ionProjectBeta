import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { trigger, state, style, transition, animate, group } from '@angular/animations';

import { TouristParams } from './../../interfaces/touristParams.interface';



import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

const locationStorageKey = "locationStorageKey";

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
  animations: [
    trigger('popupAnim', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('0.25s', style({
          opacity: 1,
        }))
      ]),
      transition(':leave', [
        animate('0.25s', style({
          opacity: 0,
        }))

      ])
    ])
  ]
})
export class LocationPage {
  map: GoogleMap;
  gspIsLoading: boolean = false;
  marker: Marker = null;
  lat: string = null;
  lng: string = null;

  tp: TouristParams = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private googleMaps: GoogleMaps, private geolocation: Geolocation) {
    this.tp = navParams.data;
  }

  ionViewDidLoad() {
    this.marker = null;

    console.log('ionViewDidLoad LocationPage');
    this.loadMap();
  }

  nextPage() {
    if (this.lat != null) {
      this.tp.lat = this.lat;
      this.tp.lng = this.lng

      this.navCtrl.push("NamePage", this.tp);

    }
    else {
      alert("you need to add a location in order to procede")
    }

  }

  getLocation() {
    console.log("getting location....");
    this.gspIsLoading = true;

    this.geolocation.getCurrentPosition().then((pos) => {
      this.gspIsLoading = false;
      this.setAndZoomMarker(pos.coords.latitude, pos.coords.longitude);

    }).catch((error) => {
      this.gspIsLoading = false;

      console.log('Error getting location', error);
      //PositionError {code: 1, message: "Illegal Access"}
      //TODO handle this
      alert("impossible get the location.");
    });
  }


  cancelGPS() {
    //TODO stop getting gps
    this.gspIsLoading = false;

  }

  loadMap() {


    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    this.map = this.googleMaps.create(element);

    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log('Map is ready!');

      this.map.addMarker({
        icon: {
          url: 'assets/img/blueMarker.png',
          anchor: [15, 42],
          size: {
            width: 31,
            height: 42
          }
        },
        visible: false,
        draggable: false,
        disableAutoPan: true,
        position: {
          lat: 0,
          lng: 0
        }
      }).then((marker: Marker) => {
        this.marker = marker;
        this.listenToClickEvent();

      });



      //Set true if you want to show the MyLocation button
      this.map.setMyLocationEnabled(true);

      // create CameraPosition
      let position: CameraPosition = {
        target: {
          lat: 46.948212,
          lng: 8.303241
        },
        zoom: 7,
        tilt: 0
      };
      // move the map's camera to position
      this.map.moveCamera(position);
      this.getLocation();
    }
    );

  }

  listenToClickEvent() {
    this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(
      (latLng) => {
        this.setAndZoomMarker(latLng.lat, latLng.lng);
      }
    );
    /*
    declare var plugin: any;

    this.map.on(plugin.google.maps.event.MAP_CLICK).subscribe(
      (data) => {
        console.log("Click MAP2");
        console.log(data);

      }
    );*/
  }

  setAndZoomMarker(lat, lng) {
    this.lat = lat;
    this.lng = lng;

    localStorage.setItem(locationStorageKey, JSON.stringify({
      lat: lat,
      lng: lng
    }));
    this.marker.setPosition({
      lat: lat,
      lng: lng
    });
    this.marker.setVisible(true);

    let position: CameraPosition = {
      target: {
        lat: lat,
        lng: lng
      },
      zoom: 16,
      duration: 1000,
    };
    // move the map's camera to position
    this.map.animateCamera(position);
  }

}
