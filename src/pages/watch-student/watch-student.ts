import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from "../popover/popover";
import { DataProvider } from '../../providers/data-provider/data-provider';
import { CameraPage } from '../camera/camera'
import { Events } from 'ionic-angular';

/**
* Generated class for the WatchStudentPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
    selector: 'page-watch-student',
    templateUrl: 'watch-student.html',
})
export class WatchStudentPage {
    students = [];

    constructor(public events: Events, public navCtrl: NavController, private dataProvider: DataProvider,public popoverCtrl: PopoverController) {
        events.subscribe('students:updated', (students) => {
            this.students = students;
        });
    }

    camera(student) {
        this.navCtrl.push(CameraPage, { student: student });
    }

    presentPopover(myEvent) {
        let popover = this.popoverCtrl.create(PopoverPage);
        popover.present({
            ev: myEvent
        });
    }
}
