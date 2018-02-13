import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class DataProvider {

    public students: any = [];

    constructor(private storage: Storage) {
        this.initializeStudents();
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
        this.students.push(student);
        this.storage.set('students', JSON.stringify(this.students));
    }

    updateStudent(student) {
        var foundStudents = this.students.filter((_student) => {
            return (_student.id == student.id);
        });

        var foundStudent = null;
        if(foundStudents.length > 0) {
            foundStudent = foundStudents[0];
        }

        if(foundStudent != null) {
            foundStudent = student;
        }
        this.storage.set('students', JSON.stringify(this.students));
    }

    deleteStudent(student) {
        this.students.splice(this.students.indexOf(student), 1);
        this.storage.set('students', JSON.stringify(this.students));
    }
}
