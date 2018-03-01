import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PdfPage } from '../pdf/pdf'
import { AddActivityPage } from '../add-activity/add-activity'
import { DataProvider } from '../../providers/data-provider/data-provider';
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
  public selectedImages = [];

public isVisible = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,private dataProvider: DataProvider) {
    this.student = navParams.get("student");

    for(var i = 0; i< this.student.pictures.length;i++)
    {
        this.picturePreview[i] = "data:image/png;base64," + this.student.pictures[i][1];
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectImagesPage');
  }

  imageSelected(i){
    if(this.isVisible[i] == true)
    {
          this.isVisible[i] = false;
          var index = this.selectedImages.indexOf(i);
          if (index !== -1) this.selectedImages.splice(index, 1);
    }
    else
    {
          this.isVisible[i] = true;
          this.selectedImages.push(i);
    }

  }

  valider(){

this.dataProvider.addImages(this.selectedImages);
this.navCtrl.pop();
  }

  goBack(){
this.navCtrl.pop();
  }

}
