import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EditStudentPage } from '../edit-student/edit-student'
import { DataProvider } from '../../providers/data-provider/data-provider';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    public students = [];

    constructor(public navCtrl: NavController, private dataProvider: DataProvider) {
        this.students = this.dataProvider.students;
    }

    searchStudent(ev: any) {
        this.students = this.dataProvider.students;

        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.students = this.students.filter((student) => {
                return (student.firstname.toLowerCase().indexOf(val.toLowerCase()) > -1 || student.lastname.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }

    editStudent(student) {
        this.navCtrl.push(EditStudentPage, { student: student });
    }
}
