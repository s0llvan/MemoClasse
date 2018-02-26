import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CameraPreview, CameraPreviewOptions , CameraPreviewPictureOptions } from '@ionic-native/camera-preview';
import { DataProvider } from '../../providers/data-provider/data-provider';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

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
    public picture = [];
    public nbPicture = 5;
    public picturePreview = [];
    public isHide : boolean;
    public position = 0;

    public pictureOpts: CameraPreviewPictureOptions;
    public student: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private cameraPreview: CameraPreview, private dataProvider: DataProvider, private screenOrientation: ScreenOrientation) {
        this.student = navParams.get("student");
        this.isHide = true;
        this.nbPicture = 0;
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
            this.picture[this.position] = imageData;
            this.picturePreview[this.position] = "data:image/png;base64," + imageData;
        }, (err) => {
            this.picture[this.position] = 'assets/img/test.jpg';
        });

        this.cameraPreview.hide();
        this.isHide = true;
    }

    showCamera() {
        this.cameraPreview.show();
        this.isHide = false;
    }

    pushPicture() {
        for(var i = 1; i <= this.nbPicture; i++){
            if(this.picture[i] != null){
                this.student.pictures.push(this.picture[i]);
            }
        }
        this.dataProvider.updateStudent(this.student);

        this.picture = null;
        this.picturePreview = null;
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
