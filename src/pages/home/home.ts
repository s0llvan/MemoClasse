import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    public students = [];

    constructor(private camera: Camera) {
        this.initializeStudents();
    }

    initializeStudents() {
        this.students = [
            { firstname: "John", lastname: "Doe"},
            { firstname: "Jean", lastname: "Van Damme"},
            { firstname: "Chris", lastname: "Markley"},
            { firstname: "Jessica", lastname: "Roe"},
            { firstname: "Michael", lastname: "Tang"},
            { firstname: "Stacy", lastname: "Willard"},
            { firstname: "Leonardo", lastname: "Mason"},
            { firstname: "Lee", lastname: "Winters"},
            { firstname: "Mary", lastname: "Wilson"},
        ];
    }

    searchStudent(ev: any) {
        this.initializeStudents();

        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.students = this.students.filter((student) => {
                return (student.firstname.toLowerCase().indexOf(val.toLowerCase()) > -1 || student.lastname.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
    }
}
