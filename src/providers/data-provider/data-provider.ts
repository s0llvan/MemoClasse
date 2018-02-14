import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';

@Injectable()
export class DataProvider {

    public students: any = [];

    constructor(private storage: Storage, public platform: Platform) {
        if (this.platform.is('mobile')) {
            this.initializeStudents();
        }
    }

    initializeStudents() {
        return this.storage.get('students').then((val) => {
            if(val == null){
                this.students = [];
            }
            else{
                this.students = JSON.parse(val);
            }
            return this.students;
        });
    }

    addStudent(student) {
        student.id = this.getLastStudentId() + 1;
        this.students.push(student);
        this.saveStudents();
    }

    updateStudent(student) {
        var foundStudents = this.students.filter((_student) => {
            return (_student.id == student.id);
        });

        if(foundStudents.length > 0) {
            foundStudents[0] = student;
        }

        this.saveStudents();
    }

    deleteStudent(student) {
        this.students.splice(this.students.indexOf(student), 1);
        this.saveStudents();
    }

    saveStudents() {
        if (this.platform.is('mobile')) {
            this.storage.set('students', JSON.stringify(this.students));
        }
    }

    getLastStudentId() {
        return (this.students.length > 0) ? this.students[this.students.length-1].id : 1;
    }
}
