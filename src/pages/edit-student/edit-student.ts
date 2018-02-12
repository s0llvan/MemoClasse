import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data-provider/data-provider';

/**
* Generated class for the EditStudentPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
    selector: 'page-edit-student',
    templateUrl: 'edit-student.html',
})
export class EditStudentPage {

    public student = { mails: [] };
    public mail: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider: DataProvider) {
        this.student = navParams.get("student");
    }

    addStudentMail() {
        this.student.mails.push(this.mail);
        this.mail = "";
        this.saveStudent();
    }

    saveStudent() {
        this.dataProvider.updateStudent(this.student);
    }

    saveStudentAndBack() {
        this.dataProvider.updateStudent(this.student);
        this.navCtrl.pop();
    }

    deleteStudent() {
        this.dataProvider.deleteStudent(this.student);
        this.navCtrl.pop();
    }

    deleteStudentMail(mail) {
        this.student.mails.splice(this.student.mails.indexOf(mail), 1);
        this.saveStudent();
    }
}
