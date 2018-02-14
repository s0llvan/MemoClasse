import {NavController, ViewController} from "ionic-angular";
import {Component} from "@angular/core";
import {PdfPage} from '../pdf/pdf';
import {WatchStudentPage} from '../watch-student/watch-student';

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

    gotoWatchStudent(){
      this.navCtrl.push(WatchStudentPage);
    }
    gotoPDF() {
        this.navCtrl.push(PdfPage);
    }
}
