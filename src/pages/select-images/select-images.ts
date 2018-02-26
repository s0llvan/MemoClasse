import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SelectImagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-images',
  templateUrl: 'select-images.html',
})
export class SelectImagesPage {

student;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.student = navParams.get("student");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectImagesPage');
  }

}
