import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data-provider/data-provider';
import { ToastController } from 'ionic-angular';
import { CameraPreview, CameraPreviewOptions , CameraPreviewPictureOptions } from '@ionic-native/camera-preview';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

/**
* Generated class for the AddStudentPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
    selector: 'page-add-student',
    templateUrl: 'add-student.html',
    providers: [
        ScreenOrientation
    ]
})
export class AddStudentPage {

    public class: any;
    public student = { id: 0, firstname:null, lastname:null, mails: [], pictures: [], profilPicture: null };
    public profilPicture : string;
    public picturePreview = "";
    public isHide : boolean;
    public pictureOpts: CameraPreviewPictureOptions;


    constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider: DataProvider, private toastController: ToastController, private cameraPreview: CameraPreview, private screenOrientation: ScreenOrientation) {
        this.class = this.navParams.get('class');
        this.isHide = true;
    }

    addStudent() {
        if(this.student.firstname == null) {
            this.toastError("Vous devez rentrer un prénom !");
        } else if(this.student.lastname == null) {
            this.toastError("Vous devez rentrer un nom !");
        } else if(Object.keys(this.student.mails).length <= 0) {
            this.toastError("Vous devez rentrer au moins une adresse email !")
        } else {
            this.dataProvider.addStudent(this.class, this.student);
            this.navCtrl.pop();
        }
    }

    back() {
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
            this.profilPicture = this.picturePreview;
            this.pushPicture();
            this.isHide = true;
            this.cameraPreview.stopCamera();
            this.screenOrientation.unlock();
        }, (err) => {
            this.profilPicture = 'assets/img/test.jpg';
        });
    }

    pushPicture() {

        this.student.profilPicture = this.profilPicture;

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
