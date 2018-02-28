import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SelectImagesPage } from '../select-images/select-images'
import { DataProvider } from '../../providers/data-provider/data-provider';

/**
 * Generated class for the AddActivityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-activity',
  templateUrl: 'add-activity.html',
})
export class AddActivityPage {

  letterObj = {
      activite: '',
      addSub: '',
      addText: '',
      pictures: []
  }

selection;
student;
  constructor(public navCtrl: NavController, public navParams: NavParams,private dataProvider: DataProvider) {

    this.student = navParams.get("student");

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddActivityPage');
  }

  addImages(){
    this.navCtrl.push(SelectImagesPage, { student: this.student });
  }


  valider(){
    this.selection = this.dataProvider.images;

    this.letterObj.pictures = this.selection;
    this.dataProvider.addActivity(this.letterObj);
    this.navCtrl.pop();
  }

}
