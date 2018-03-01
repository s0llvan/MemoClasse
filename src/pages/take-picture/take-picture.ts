import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';

@IonicPage()
@Component({
    selector: 'page-take-picture',
    templateUrl: 'take-picture.html',
})
export class TakePicturePage {

    constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera) {
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad TakePicturePage');
    }

}

const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
}

this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64:
    let base64Image = 'data:image/jpeg;base64,' + imageData;
}, (err) => {
    // Handle error
});
