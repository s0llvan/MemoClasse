import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditStudentPage } from '../edit-student/edit-student'
import { PdfPage } from '../pdf/pdf'
import { DataProvider } from '../../providers/data-provider/data-provider';

/**
* Generated class for the StudentModalPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@Component({
    selector: 'student-modal',
    templateUrl: 'student-modal.html',
})
export class StudentModalPage {

    student;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.student = this.navParams.get('student');
    }

    activityReports() {
        this.navCtrl.push(PdfPage, { student: this.student });
    }

    editStudent() {
        this.navCtrl.push(EditStudentPage, { student: this.student });
    }

    closeModal() {
        this.navCtrl.pop();
    }
}
