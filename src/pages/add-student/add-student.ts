import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data-provider/data-provider';

/**
* Generated class for the AddStudentPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
    selector: 'page-add-student',
    templateUrl: 'add-student.html',
})
export class AddStudentPage {

    public student = { firstname:"",lastname:"",mails: [] };
    public mail: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider: DataProvider) {

    }

    addStudent() {
        this.dataProvider.addStudent(this.student);
        this.navCtrl.pop();
    }

    addStudentMail(mail) {
        this.student.mails.push(this.mail);
        this.mail = "";
    }

    back() {
        this.navCtrl.pop();
    }
}
