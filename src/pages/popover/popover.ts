import {NavController, ViewController} from "ionic-angular";
import {Component} from "@angular/core";
import {PdfPage} from '../pdf/pdf';

@Component({
    selector: 'popover',
    templateUrl: 'popover.html',
})
export class PopoverPage {
    constructor(public viewCtrl: ViewController, public navCtrl: NavController) {
    }

    close() {
        this.viewCtrl.dismiss();
    }

    gotoPDF() {
        this.navCtrl.push(PdfPage);
    }
}
