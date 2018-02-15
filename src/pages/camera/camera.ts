import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CameraPreview, CameraPreviewOptions , CameraPreviewPictureOptions } from '@ionic-native/camera-preview';

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

    constructor(public navCtrl: NavController, public navParams: NavParams, private cameraPreview: CameraPreview) {
      // picture options
        this.startCamera();

    }

    startCamera() {
        const cameraPreviewOpts: CameraPreviewOptions = {
            x: 0,
            y: window.screen.height/3,
            width: window.screen.width,
            height: window.screen.height/3,
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
          this.cameraPreview.stopCamera();
        }

        showCamera(){
            this.cameraPreview.show();
        }

        refresh(){
          window['location'].reload();
      }

    }
