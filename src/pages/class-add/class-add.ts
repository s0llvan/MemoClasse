import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data-provider/data-provider';
import { ToastController } from 'ionic-angular';
import { CameraPreview, CameraPreviewOptions , CameraPreviewPictureOptions } from '@ionic-native/camera-preview';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@IonicPage()
@Component({
    selector: 'page-class-add',
    templateUrl: 'class-add.html',
    providers: [
        ScreenOrientation
    ]
})
export class ClassAddPage {

    public class = { id: 0, name: "" , profilPicture: String};
    public profilPicture = null;
    public picturePreview = "";
    public isHide : boolean;
    public pictureOpts: CameraPreviewPictureOptions;

    constructor(private dataProvider: DataProvider, public navCtrl: NavController, public navParams: NavParams, private toastController: ToastController, private cameraPreview: CameraPreview, private screenOrientation: ScreenOrientation) {

    }

    addClass() {
        this.dataProvider.addClass(this.class);
        this.navCtrl.pop();
    }

    toastError(msg) {
        let toast = this.toastController.create({
            message: msg,
            duration: 3000,
            position: 'top',
            cssClass: "toast"
        });
        toast.present();
    }


    startCamera() {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);

        const cameraPreviewOpts: CameraPreviewOptions = {
            x: 0,
            y: (window.screen.height/100)*15,
            width: window.screen.width,
            height: (window.screen.height/100)*71,
            camera: 'rear',
            tapPhoto: true,
            previewDrag: false,
            toBack: false,
            alpha: 1
        };

        this.cameraPreview.startCamera(cameraPreviewOpts);
        this.cameraPreview.show();
        this.isHide = false;
    };

    takePicture() {
        this.pictureOpts = {
            width: 1280,
            height: 1280,
            quality: 85
        }   

        this.cameraPreview.takePicture(this.pictureOpts).then((imageData) =>
        {
            this.picturePreview = "data:image/png;base64," + imageData;
            this.profilPicture = [this.picturePreview, imageData];
            this.pushPicture();
            this.isHide = true;
            this.cameraPreview.stopCamera();
            this.screenOrientation.unlock();
        }, (err) => {
            this.profilPicture = 'assets/img/test.jpg';
        });
    }

    pushPicture() {

        this.class.profilPicture = this.profilPicture;

        this.toastError("Photographie enregistrée.");
    }

    goBack(){
        this.isHide = true;
        this.cameraPreview.stopCamera();
        this.navCtrl.pop();
    }

    closeCamera(){
        this.isHide = true;
        this.cameraPreview.stopCamera();
    }

    ionViewWillLeave() {
        this.isHide = true;
        this.cameraPreview.stopCamera();
    }
}
