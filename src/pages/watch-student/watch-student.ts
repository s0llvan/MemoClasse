import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from "../popover/popover";
import { DataProvider } from '../../providers/data-provider/data-provider';
import { CameraPage } from '../camera/camera'


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

  constructor(public navCtrl: NavController, private dataProvider: DataProvider,public popoverCtrl: PopoverController) {
      this.students = this.dataProvider.students;
  }

  ionViewDidLoad() {
      return this.dataProvider.initializeStudents().then(data => this.students = data);
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
