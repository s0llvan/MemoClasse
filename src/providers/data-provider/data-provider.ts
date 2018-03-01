import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { Events } from 'ionic-angular';

@Injectable()
export class DataProvider {

    public data: any = [];

    public images: any = [];

    public activities: any = [];

    constructor(public events: Events, private storage: Storage, public platform: Platform) {
        if (this.platform.is('mobile')) {
            this.initializeData();
        } else {
            for(let u = 1;u < 9;u++) {
                this.data.push({ id: u, name: "Classe " + u, students: [] });

                for(let i = 1;i < 17;i++) {
                    this.data[u-1].students.push({ id: u + "" + i, firstname: "Prenom " + u + "" + i, lastname: "Nom " + u + "" + i, mails: ["mail@domain.com","mail2@domain.com"], pictures: [] });
                }
            }
        }
    }

    initializeData() {
        this.storage.get('data').then((val) => {
            if(val == null){
                this.data = [];
            }
            else {
                this.data = JSON.parse(val);
            }
            this.events.publish('data:updated', this.data);
        });
    }

    addClass(_class) {
        _class.id = this.getLastClassId() + 1;
        _class.students = [];

        this.data.push(_class);

        this.saveData();
    }

    addStudent(_class, student) {
        student.id = this.getLastStudentId() + 1;
        student.pictures = [];

        _class.students.push(student);

        this.saveData();
    }

    updateStudent(student) {
        this.data.forEach((_class) => {
            let studentIndex = _class.students.findIndex((_student) => {
                return (_student.id == student.id);
            });

            if(studentIndex > -1) {
                _class.students[studentIndex] = student;
            }
        });
        this.saveData();
    }

    deleteStudent(student) {
        this.data.forEach((_class) => {
            let studentIndex = _class.students.findIndex((_student) => { return _student.id === student.id; });
            if(studentIndex > -1) {
                _class.students.splice(studentIndex, 1);
            }
        });
        this.saveData();
    }

    addImages(images) {
        this.images = images;
    }

    addActivity(activity){
        this.activities.push(activity);
    }

    resetActivities(){
        this.activities = [];
    }

    removeImages(student){
      // student.pictures.splice(0,5);
      // this.updateStudent(student);
    }

    saveData() {
        this.events.publish('data:updated', this.data);

        if (this.platform.is('mobile')) {
            this.storage.set('data', JSON.stringify(this.data));
        }
    }

    getStudentsByClass(_class) {
        return this.data.filter((__class) => {
            return (__class == _class);
        });
    }

    getLastClassId() {
        return (this.data.length > 0) ? this.data[this.data.length-1].id : 1;
    }

    getLastStudentId() {
        let lastStudentId = 0;
        this.data.forEach(function(classe) {
            classe.students.forEach(function(student) {
                if(student.id > lastStudentId) {
                    lastStudentId = student.id;
                }
            });
        });
        return lastStudentId;
    }
}
