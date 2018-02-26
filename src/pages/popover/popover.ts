import { NavController, ViewController } from "ionic-angular";
import { Component } from "@angular/core";
import { WatchStudentPage } from '../watch-student/watch-student';
import { AuthentificationProvider } from '../../providers/authentification/authentification';
import { PdfPage } from "../pdf/pdf";

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

    gotoPDF() {
        this.navCtrl.push(PdfPage);
        this.close();
    }

    admin(){
        this.authentificationProvider.is_admin = !this.authentificationProvider.is_admin;
    }
}
