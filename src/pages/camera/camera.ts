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
    public dateObj = new Date();
    public date = this.dateObj.getUTCDate()+"/"+this.dateObj.getUTCMonth()+"/"+this.dateObj.getUTCFullYear();

    public pictureOpts: CameraPreviewPictureOptions;
    public student: any;

    constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, private cameraPreview: CameraPreview, private dataProvider: DataProvider, private screenOrientation: ScreenOrientation) {
        this.student = navParams.get("student");
        this.isHide = true;
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
        this.searchLastPictures();
    }

    startCamera(position) {
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
        this.position = position;
    };

    takePicture() {
        this.pictureOpts = {
            width: 1280,
            height: 1280,
            quality: 85
        }

        for(let p of this.student.pictures) {
            if(p[0] == this.pictures[this.position][0])
            {
                this.student.pictures.splice(this.student.pictures.indexOf(p), 1);
            }
        }

        this.cameraPreview.takePicture(this.pictureOpts).then((imageData) =>
        {

            this.picturePreview[this.position] = "data:image/png;base64," + imageData;
            this.pictures[this.position] = [this.picturePreview[this.position], imageData, this.date];
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
            var alreadyExist = false;
            if(p != null)
            {
                for(let s of this.student.pictures){
                    if(p[0] == s[0]){
                        alreadyExist = true;
                    }
                }
                if(!alreadyExist){
                    this.student.pictures.push(p);
                }
            }
        }

        let toast;
        this.dataProvider.updateStudent(this.student);
        if(this.pictures[0] != null){
            toast = this.toastCtrl.create({
              message: 'Photographies enregistrées',
              duration: 3000
            });
        }
        else{
            if(this.pictures[0] != null){
            toast = this.toastCtrl.create({
              message: 'Pas de Photographies',
              duration: 3000
            });
        }
        }

        toast.present();

        this.pictures = null;

        this.picturePreview = null;
        this.goBack();
    }

    searchLastPictures(){
        var count = 0;
        for(let pics of this.student.pictures) {
            if(pics != null)
            {
                if (pics[2] == this.dateObj.getUTCDate()+"/"+this.dateObj.getUTCMonth()+"/"+this.dateObj.getUTCFullYear()) {
                    this.pictures[count] = pics;
                    count++;
                }
            }
        }
        return this.pictures;
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
