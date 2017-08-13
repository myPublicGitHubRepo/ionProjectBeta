webpackJsonp([2],{

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationPageModule", function() { return LocationPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__location__ = __webpack_require__(284);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LocationPageModule = (function () {
    function LocationPageModule() {
    }
    return LocationPageModule;
}());
LocationPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__location__["a" /* LocationPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__location__["a" /* LocationPage */]),
        ],
    })
], LocationPageModule);

//# sourceMappingURL=location.module.js.map

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_animations__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_maps__ = __webpack_require__(200);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var locationStorageKey = "locationStorageKey";
var LocationPage = (function () {
    function LocationPage(navCtrl, navParams, googleMaps, geolocation) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.googleMaps = googleMaps;
        this.geolocation = geolocation;
        this.gspIsLoading = false;
        this.marker = null;
        this.lat = null;
        this.lng = null;
        this.tp = null;
        this.tp = navParams.data;
    }
    LocationPage.prototype.ionViewDidLoad = function () {
        this.marker = null;
        console.log('ionViewDidLoad LocationPage');
        this.loadMap();
    };
    LocationPage.prototype.nextPage = function () {
        if (this.lat != null) {
            this.tp.lat = this.lat;
            this.tp.lng = this.lng;
            this.navCtrl.push("NamePage", this.tp);
        }
        else {
            alert("you need to add a location in order to procede");
        }
    };
    LocationPage.prototype.getLocation = function () {
        var _this = this;
        console.log("getting location....");
        this.gspIsLoading = true;
        this.geolocation.getCurrentPosition().then(function (pos) {
            _this.gspIsLoading = false;
            _this.setAndZoomMarker(pos.coords.latitude, pos.coords.longitude);
        }).catch(function (error) {
            _this.gspIsLoading = false;
            console.log('Error getting location', error);
            //PositionError {code: 1, message: "Illegal Access"}
            //TODO handle this
            alert("impossible get the location.");
        });
    };
    LocationPage.prototype.cancelGPS = function () {
        //TODO stop getting gps
        this.gspIsLoading = false;
    };
    LocationPage.prototype.loadMap = function () {
        var _this = this;
        // create a new map by passing HTMLElement
        var element = document.getElementById('map');
        this.map = this.googleMaps.create(element);
        // listen to MAP_READY event
        // You must wait for this event to fire before adding something to the map or modifying it in anyway
        this.map.one(__WEBPACK_IMPORTED_MODULE_4__ionic_native_google_maps__["b" /* GoogleMapsEvent */].MAP_READY).then(function () {
            console.log('Map is ready!');
            _this.map.addMarker({
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
            }).then(function (marker) {
                _this.marker = marker;
                _this.listenToClickEvent();
            });
            //Set true if you want to show the MyLocation button
            _this.map.setMyLocationEnabled(true);
            // create CameraPosition
            var position = {
                target: {
                    lat: 46.948212,
                    lng: 8.303241
                },
                zoom: 7,
                tilt: 0
            };
            // move the map's camera to position
            _this.map.moveCamera(position);
            _this.getLocation();
        });
    };
    LocationPage.prototype.listenToClickEvent = function () {
        var _this = this;
        this.map.on(__WEBPACK_IMPORTED_MODULE_4__ionic_native_google_maps__["b" /* GoogleMapsEvent */].MAP_CLICK).subscribe(function (latLng) {
            _this.setAndZoomMarker(latLng.lat, latLng.lng);
        });
        /*
        declare var plugin: any;
    
        this.map.on(plugin.google.maps.event.MAP_CLICK).subscribe(
          (data) => {
            console.log("Click MAP2");
            console.log(data);
    
          }
        );*/
    };
    LocationPage.prototype.setAndZoomMarker = function (lat, lng) {
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
        var position = {
            target: {
                lat: lat,
                lng: lng
            },
            zoom: 16,
            duration: 1000,
        };
        // move the map's camera to position
        this.map.animateCamera(position);
    };
    return LocationPage;
}());
LocationPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-location',template:/*ion-inline-start:"/Users/Zerododici/git/ionProjectBeta/src/pages/location/location.html"*/'<ion-header>\n\n    <ion-navbar color="white">\n        <img class="stepsImg" src="assets/img/step2.png" />\n\n        <ion-buttons end>\n            <button ion-button icon-end clear (tap)="nextPage()">\n            Next\n            <ion-icon name="arrow-forward" ></ion-icon>\n          </button>\n        </ion-buttons>\n    </ion-navbar>\n\n</ion-header>\n\n\n\n\n<ion-content>\n    <!--<img class="stepsImg" style="opacity: 0.5;" src="../../assets/img/step2.png" />-->\n    <div id="map"></div>\n    <div [@popupAnim] class="gpsLoad" *ngIf="gspIsLoading">\n        <br>\n        <br>\n        <h1 padding>Getting your current location...</h1>\n        <button style=" margin:0 auto;display:block;" ion-button (tap)="cancelGPS()">Cancel</button>\n\n        <div class="wave3l"></div>\n        <div class="wave2l"></div>\n        <div class="wave1l"></div>\n    </div>\n</ion-content>'/*ion-inline-end:"/Users/Zerododici/git/ionProjectBeta/src/pages/location/location.html"*/,
        animations: [
            Object(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["h" /* trigger */])('popupAnim', [
                Object(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["e" /* state */])('void', Object(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["f" /* style */])({ opacity: 0 })),
                Object(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["g" /* transition */])(':enter', [
                    Object(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["c" /* animate */])('0.25s', Object(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["f" /* style */])({
                        opacity: 1,
                    }))
                ]),
                Object(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["g" /* transition */])(':leave', [
                    Object(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["c" /* animate */])('0.25s', Object(__WEBPACK_IMPORTED_MODULE_3__angular_animations__["f" /* style */])({
                        opacity: 0,
                    }))
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_google_maps__["a" /* GoogleMaps */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */]])
], LocationPage);

//# sourceMappingURL=location.js.map

/***/ })

});
//# sourceMappingURL=2.js.map