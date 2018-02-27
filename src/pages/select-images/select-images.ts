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
  public picturePreview = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.student = navParams.get("student");

for(var i = 0; i< this.student.pictures.length;i++)
{
    this.picturePreview[i] = "data:image/png;base64," + this.student.pictures[i];
}


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectImagesPage');
  }

}
