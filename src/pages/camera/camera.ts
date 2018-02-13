import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CameraPreview, CameraPreviewOptions } from '@ionic-native/camera-preview';

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

    constructor(public navCtrl: NavController, public navParams: NavParams, private cameraPreview: CameraPreview) {

        this.startCamera();
    }

    startCamera() {
        const cameraPreviewOpts: CameraPreviewOptions = {
            x: 0,
            y: 0,
            width: window.screen.width-1,
            height: window.screen.height-1,
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

        showCamera(){
            this.cameraPreview.show();
        }
    }
