import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddStudentPage } from '../add-student/add-student'
import { DataProvider } from '../../providers/data-provider/data-provider';
import { AuthentificationProvider } from '../../providers/authentification/authentification';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from "../popover/popover";
import { Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { StudentModalPage } from '../student-modal/student-modal';
import { Events } from 'ionic-angular';
import { CameraPage } from '../camera/camera';
import { ClassEditPage } from '../class-edit/class-edit';

@Component({
    selector: 'page-student-list',
    templateUrl: 'student-list.html'
})
export class StudentListPage {

    public class: any;
    public students: any;

    constructor(public navParams: NavParams, public authentificationProvider: AuthentificationProvider, public events: Events, public navCtrl: NavController, private dataProvider: DataProvider, public popoverCtrl: PopoverController, public platform: Platform, public modalCtrl: ModalController) {
        this.class = this.navParams.get('class');
        this.students = this.class.students;

        this.events.subscribe('class:updated', (_class) => {
            if(_class.id == this.class.id) {
                this.class = _class;
                this.students = this.class.students;
            }
        });
    }

    searchStudent(ev: any) {
        this.students = this.dataProvider.getStudentsByClass(this.class);
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
        this.navCtrl.push(AddStudentPage, { class: this.class });
    }

    editClass() {
        let modal = this.modalCtrl.create(ClassEditPage, { class: this.class });
        modal.present();
    }

    selectStudent(student) {
        if(this.authentificationProvider.isAdmin()) {
            let modal = this.modalCtrl.create(StudentModalPage, { student: student, class: this.class });
            modal.present();
        } else {
            this.navCtrl.push(CameraPage, { student: student });
        }
    }

    presentPopover(event) {
        let popover = this.popoverCtrl.create(PopoverPage);
        popover.present({
            ev: event
        });
    }
}
