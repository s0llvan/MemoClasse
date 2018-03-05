import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { DataProvider } from '../../providers/data-provider/data-provider';
import { ClassListPage } from "../class-list/class-list";
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { CameraPreview, CameraPreviewOptions , CameraPreviewPictureOptions } from '@ionic-native/camera-preview';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@IonicPage()
@Component({
    selector: 'page-class-edit',
    templateUrl: 'class-edit.html',
    providers: [
        ScreenOrientation
    ]
})
export class ClassEditPage {

    public class: any;
    public profilPicture: string;
    public picturePreview = "";
    public isHide : boolean;
    public pictureOpts: CameraPreviewPictureOptions;

    constructor(private app: App, public alertCtrl: AlertController, private dataProvider: DataProvider, public navCtrl: NavController, public navParams: NavParams, private cameraPreview: CameraPreview, private screenOrientation: ScreenOrientation, private toastController: ToastController) {
        this.class = this.navParams.get("class");
        this.isHide = true;
        this.profilPicture = null;
    }

    saveClass() {
        this.dataProvider.updateClass(this.class);
        this.navCtrl.pop();
    }

    deleteClass() {
        let confirm = this.alertCtrl.create({
            title: 'Voulez-vous vraiment supprimer cette classe ?',
            message: "Toutes les informations de cette classe et des élèves seront supprimées.",
            buttons: [
                {
                    text: 'Non',
                    handler: () => {}
                },
                {
                    text: 'Oui',
                    handler: () => {
                        this.dataProvider.deleteClass(this.class);
                        this.navCtrl.pop();

                        const root = this.app.getRootNav();
                        root.popToRoot();
                    }
                }
            ]
        });
        confirm.present();
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

        this.class.profilPicture = this.profilPicture;

        this.toastError("Photographie enregistrée.");
    }

    goBack(){
        this.isHide = true;
        this.cameraPreview.stopCamera();
        this.navCtrl.pop();
    }

    ionViewWillLeave() {
        this.isHide = true;
        this.cameraPreview.stopCamera();
    }

    searchPicture(){
        if(this.class.profilPicture != null){
            this.profilPicture = this.class.profilPicture;
        }
        return this.profilPicture;
    }
}
