import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { Events } from 'ionic-angular';

@Injectable()
export class DataProvider {

    public students: any = [];

    public images: any = [];

    public activities: any = [];

    constructor(public events: Events, private storage: Storage, public platform: Platform) {
        if (this.platform.is('mobile')) {
            this.initializeStudents();
        }
    }

    initializeStudents() {
        this.storage.get('students').then((val) => {
            if(val == null){
                this.students = [];
            }
            else {
                this.students = JSON.parse(val);
            }
            this.events.publish('students:updated', this.students);
        });
    }

    addStudent(student) {
        student.pictures = [];
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

    addImages(images) {
        this.images = images;
    }

    addActivity(activity){
      this.activities.push(activity);
    }

    saveStudents() {
        this.events.publish('students:updated', this.students);

        if (this.platform.is('mobile')) {
            this.storage.set('students', JSON.stringify(this.students));
        }
    }

    getLastStudentId() {
        return (this.students.length > 0) ? this.students[this.students.length-1].id : 1;
    }
}
