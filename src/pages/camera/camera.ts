import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CameraPreview, CameraPreviewOptions , CameraPreviewPictureOptions } from '@ionic-native/camera-preview';
import { DataProvider } from '../../providers/data-provider/data-provider';

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
    public picturePreview: string;

    public pictureOpts: CameraPreviewPictureOptions;
    public student: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private cameraPreview: CameraPreview, private dataProvider: DataProvider) {
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

        this.cameraPreview.startCamera(cameraPreviewOpts);
        this.cameraPreview.show();
    };

    takePicture() {
        this.pictureOpts = {
            width: 1280,
            height: 1280,
            quality: 85
        }
        // take a picture
        this.cameraPreview.takePicture(this.pictureOpts).then((imageData) =>
        {
            this.picture = imageData;
            this.picturePreview = "data:image/png;base64," + imageData;
        }, (err) => {
            this.picture = 'assets/img/test.jpg';
        });

        this.cameraPreview.hide();
    }

    showCamera() {
        this.cameraPreview.show();
    }

    pushPicture() {
        this.student.pictures.push(this.picture);
        this.dataProvider.updateStudent(this.student);

        this.picture = null;
        this.picturePreview = null;
        this.showCamera();
    }

    goBack(){
        this.navCtrl.pop();
        this.cameraPreview.hide();
    }
}
