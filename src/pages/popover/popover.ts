import { NavController, ViewController } from "ionic-angular";
import { Component } from "@angular/core";
import { WatchStudentPage } from '../watch-student/watch-student';
import { AuthentificationProvider } from '../../providers/authentification/authentification';

@Component({
    selector: 'popover',
    templateUrl: 'popover.html',
})
export class PopoverPage {
    constructor(public viewCtrl: ViewController, public navCtrl: NavController, public authentificationProvider: AuthentificationProvider) {

    }

    close() {
        this.viewCtrl.dismiss();
    }

    gotoWatchStudent(){
        this.navCtrl.push(WatchStudentPage);
    }
}
