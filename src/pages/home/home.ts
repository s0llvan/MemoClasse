import {Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddStudentPage } from '../add-student/add-student'
import { DataProvider } from '../../providers/data-provider/data-provider';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from "../popover/popover";
import { Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { StudentModalPage } from '../student-modal/student-modal';
import { Events } from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    public students = [];

    constructor(public events: Events, public navCtrl: NavController, private dataProvider: DataProvider, public popoverCtrl: PopoverController, public platform: Platform, public modalCtrl: ModalController) {
        events.subscribe('students:updated', (students) => {
            this.students = students;
        });
    }

    searchStudent(ev: any) {
        this.students = this.dataProvider.students;
        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '')
        {
            this.students = this.students.filter((student) => {
                return (student.firstname.toLowerCase().indexOf(val.toLowerCase()) > -1 || student.lastname.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }

    addStudent() {
        this.navCtrl.push(AddStudentPage);
    }

    showStudentInfo(student) {
        let modal = this.modalCtrl.create(StudentModalPage, { student: student });
        modal.present();
    }

    presentPopover(myEvent) {
        let popover = this.popoverCtrl.create(PopoverPage);
        popover.present({
            ev: myEvent
        });
    }
}
