import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CameraPreview, CameraPreviewOptions , CameraPreviewPictureOptions } from '@ionic-native/camera-preview';
import { DataProvider } from '../../providers/data-provider/data-provider';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
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
    providers: [
        ScreenOrientation
    ]
})
export class CameraPage {
    public pictures = new Array(5);
    public picturePreview = [];
    public isHide : boolean;
    public position = 0;
    public date = new Date();

    public pictureOpts: CameraPreviewPictureOptions;
    public student: any;

    constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, private cameraPreview: CameraPreview, private dataProvider: DataProvider, private screenOrientation: ScreenOrientation) {
        this.student = navParams.get("student");
        this.isHide = true;
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    }

    startCamera(position) {
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
        this.isHide = false;
        this.position = position;
    };

    takePicture() {
        this.pictureOpts = {
            width: 1280,
            height: 1280,
            quality: 85
        }
        this.cameraPreview.takePicture(this.pictureOpts).then((imageData) =>
        {

            this.picturePreview[this.position] = "data:image/png;base64," + imageData;
            this.pictures[this.position] = [this.picturePreview[this.position],imageData, this.date];
        }, (err) => {
            this.pictures[this.position] = 'assets/img/test.jpg';
        });

        this.cameraPreview.hide();
        this.isHide = true;
    }

    showCamera() {
        this.cameraPreview.show();
        this.isHide = false;
    }

    pushPicture() {

        for(let p of this.pictures) {
            if(p != null)
            {
                this.student.pictures.push(p);
            }
        }

        this.dataProvider.updateStudent(this.student);
        let toast = this.toastCtrl.create({
          message: 'Photographies enregistrées',
          duration: 3000
        });

        toast.present();

        this.pictures = null;
        this.picturePreview = null;
        // this.goBack();
    }

    hideCamera(){
        this.isHide = true;
        this.cameraPreview.hide();
    }

    goBack(){
        this.isHide = true;
        this.cameraPreview.stopCamera();
        this.navCtrl.pop();
    }
}
