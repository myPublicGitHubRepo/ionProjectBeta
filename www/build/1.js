webpackJsonp([1],{

/***/ 274:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NamePageModule", function() { return NamePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__name__ = __webpack_require__(285);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NamePageModule = (function () {
    function NamePageModule() {
    }
    return NamePageModule;
}());
NamePageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__name__["a" /* NamePage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__name__["a" /* NamePage */]),
        ],
    })
], NamePageModule);

//# sourceMappingURL=name.module.js.map

/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NamePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the NamePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var NamePage = (function () {
    function NamePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.audioVideoEnabled = false;
        this.name = "";
        this.tp = null;
        this.tp = navParams.data;
    }
    NamePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NamePage');
    };
    NamePage.prototype.nextPage = function () {
        if (this.name.length >= 1) {
            this.tp.name = this.name;
            this.tp.chatOnly = !this.audioVideoEnabled;
            this.navCtrl.push("LoadingPage", this.tp);
        }
        else {
            alert("please enter your name");
        }
    };
    return NamePage;
}());
NamePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPage */])(),
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-name',template:/*ion-inline-start:"/Users/Zerododici/git/ionProjectBeta/src/pages/name/name.html"*/'<!--\n  Generated template for the NamePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar color="white">\n        <img class="stepsImg" src="assets/img/step3.png" />\n        <ion-buttons end>\n            <button ion-button icon-end clear (tap)="nextPage()">\n            Next\n            <ion-icon name="arrow-forward" ></ion-icon>\n          </button>\n        </ion-buttons>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <!--<img class="stepsImg" src="../../assets/img/step3.png" />-->\n\n\n    <p>Please enter your first name</p>\n    <ion-item>\n        <ion-label fixed>Name</ion-label>\n        <ion-input type="text" value="" [(ngModel)]="name"></ion-input>\n    </ion-item>\n    <br>\n    <p>Do you want to enable voice end videochat?</p>\n\n    <ion-item>\n        <ion-label> Audio/Video chat</ion-label>\n        <ion-toggle [(ngModel)]="audioVideoEnabled" checked="audioVideoEnabled"></ion-toggle>\n    </ion-item>\n    <p *ngIf="!audioVideoEnabled"> Audio/Video chat disabled. You will che able to comunicate with a guide through text chat</p>\n    <p *ngIf="audioVideoEnabled"> Audio/Video chat Enabled. You will che able speak whit the guide and show him your sourroundings</p>\n\n</ion-content>'/*ion-inline-end:"/Users/Zerododici/git/ionProjectBeta/src/pages/name/name.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */]])
], NamePage);

//# sourceMappingURL=name.js.map

/***/ })

});
//# sourceMappingURL=1.js.map