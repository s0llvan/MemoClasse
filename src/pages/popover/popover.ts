import { NavController, ViewController } from "ionic-angular";
import { Component } from "@angular/core";
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

    admin(){
        this.authentificationProvider.is_admin = !this.authentificationProvider.is_admin;
    }
}
