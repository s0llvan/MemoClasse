import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data-provider/data-provider';
import { AlertController } from 'ionic-angular';
import { StudentListPage } from '../student-list/student-list'
import { ToastController } from 'ionic-angular';
import { CameraPreview, CameraPreviewOptions , CameraPreviewPictureOptions } from '@ionic-native/camera-preview';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@IonicPage()
@Component({
    selector: 'page-edit-student',
    templateUrl: 'edit-student.html',
    providers: [
        ScreenOrientation
    ]
})
export class EditStudentPage {

    public student: any;
    public class: any;
    public profilPicture = null;
    public picturePreview = "";
    public isHide : boolean;
    public pictureOpts: CameraPreviewPictureOptions;

    constructor(private toastController: ToastController, public navCtrl: NavController, public navParams: NavParams, private dataProvider: DataProvider, public alertCtrl: AlertController, private cameraPreview: CameraPreview, private screenOrientation: ScreenOrientation) {
        this.student = this.navParams.get("student");
        this.class = this.navParams.get("class");
        this.isHide = true;
    }

    addStudentMail() {
        this.saveStudent();
    }

    saveStudent() {
        this.dataProvider.updateStudent(this.student);
    }

    saveStudentAndBack() {
        this.dataProvider.updateStudent(this.student);
        this.navCtrl.pop();
    }
    close(){
        this.navCtrl.pop();
    }

    deleteStudent() {
        let confirm = this.alertCtrl.create({
            title: 'Voulez-vous vraiment supprimer cet élève ?',
            message: "Toutes les informations et photos de l'élève seront supprimées.",
            buttons: [
                {
                    text: 'Non',
                    handler: () => {}
                },
                {
                    text: 'Oui',
                    handler: () => {
                        this.dataProvider.deleteStudent(this.student);
                        this.navCtrl.pop();
                        this.navCtrl.pop();
                    }
                }
            ]
        });
        confirm.present();
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
            this.cameraPreview.stopCamera();
            this.screenOrientation.unlock();
        }, (err) => {
            this.profilPicture = 'assets/img/test.jpg';
        });
    }

    pushPicture() {

        this.student.profilPicture = this.profilPicture;

        let toast;
        this.dataProvider.updateStudent(this.student);
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

    toastError(msg) {
        let toast = this.toastController.create({
            message: msg,
            duration: 3000,
            position: 'top',
            cssClass: "toast"
        });
        toast.present();
    }

    searchPicture(){
        if(this.student.profilPicture != null){
            this.profilPicture = this.student.profilPicture;
        }
        return this.profilPicture;
    }
}
