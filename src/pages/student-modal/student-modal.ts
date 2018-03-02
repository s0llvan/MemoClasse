import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditStudentPage } from '../edit-student/edit-student'
import { PdfPage } from '../pdf/pdf'
import { DataProvider } from '../../providers/data-provider/data-provider';
import { ModalController } from 'ionic-angular';

@Component({
    selector: 'page-student-modal',
    templateUrl: 'student-modal.html',
})
export class StudentModalPage {

    public student: any;
    public class: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
        this.student = this.navParams.get('student');
        this.class = this.navParams.get('class');
    }

    activityReports() {
        this.navCtrl.push(PdfPage, { student: this.student });
    }

    editStudent() {
        let modal = this.modalCtrl.create(EditStudentPage, { student: this.student, class: this.class });
        modal.present();
    }

    close() {
        this.navCtrl.pop();
    }
}
