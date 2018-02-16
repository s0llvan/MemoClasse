import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CameraPreview, CameraPreviewOptions , CameraPreviewPictureOptions } from '@ionic-native/camera-preview';
import { DataProvider } from '../../providers/data-provider/data-provider';
import { ToastController } from 'ionic-angular';



/**
* Generated class for the CameraPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {
  public picture: string;
  public pictureOpts: CameraPreviewPictureOptions;
  public student = {pictures: []};

  constructor(public navCtrl: NavController, public navParams: NavParams, private cameraPreview: CameraPreview, private dataProvider: DataProvider, private toastCtrl: ToastController) {
    // picture options
    this.student = navParams.get("student");
    this.startCamera();
  }

  startCamera() {
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: (window.screen.height/100)*10,
      width: window.screen.width,
      height: (window.screen.height/100)*70,
      camera: 'rear',
      tapPhoto: true,
      previewDrag: false,
      toBack: false,
      alpha: 1
    };

    this.cameraPreview.startCamera(cameraPreviewOpts).then(
      (res) => {
        // alert('message');
        console.log(res);
      },
      (err) => {
        // alert('Failed');
        console.log(err);
      });
      this.cameraPreview.show();
    }

    takePicture() {
      this.pictureOpts = {
        width: 1280,
        height: 1280,
        quality: 85
      }
      // take a picture
      this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
      this.picture = 'assets/img/test.jpg';
    });
    this.cameraPreview.hide();
  }

  showCamera(){
    this.cameraPreview.show();
  }

  pushPicture(picture){
    this.presentToast();
    this.student.pictures.push(this.picture);
    this.dataProvider.updateStudent(this.student);


  }

  presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Le pdf a bien été généré',
    duration: 3000,
    position: 'top',
    cssClass: "toast"
  });
  toast.present();
}

  refresh(){
    window['location'].reload();
  }

  goBack(){
    this.navCtrl.pop();
    this.cameraPreview.hide();
  }

}
