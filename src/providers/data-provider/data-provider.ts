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
            this.events.publish('class:updated', this.data);
        });
    }

    addClass(_class) {
        _class.id = this.getLastClassId() + 1;
        _class.students = [];

        this.data.push(_class);

        this.events.publish('class:updated', this.data);

        this.saveData();
    }

    updateClass(_class) {
        let classFound = _class.students.find((c) => {
            return (c.id == _class.id);
        });

        classFound = _class;

        this.saveData();
    }

    deleteClass(_class) {
        let classIndex = this.getClassById(_class.id);
        this.data.splice(classIndex, 1);

        this.events.publish('class:updated', this.data);

        this.saveData();
    }

    addStudent(_class, student) {
        student.id = this.getLastStudentId() + 1;
        student.pictures = [];
        student.class = _class.name;

        _class.students.push(student);

        this.saveData();
    }

    updateStudent(student) {
        this.data.forEach((_class) => {
            let studentIndex = this.getStudentByStudentId(_class, student.id);
            if(studentIndex > -1) {
                _class.students[studentIndex] = student;
            }
        });
        this.saveData();
    }

    deleteStudent(student) {
        this.data.forEach((_class) => {
            let studentIndex = this.getStudentByStudentId(_class, student.id);
            if(studentIndex > -1) {
                this.events.publish('student:deleted', _class, student.id);
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
        student.pictures.splice(0);
        this.updateStudent(student);
    }

    saveData() {
        if (this.platform.is('mobile')) {
            this.storage.set('data', JSON.stringify(this.data));
        }
    }

    getStudentsByClass(_class) {
        let classFound = this.data.find((c) => {
            return (c.id == _class.id);
        });
        return classFound.students;
    }

    getStudentByStudentId(_class, studentId) {
        return _class.students.findIndex((s) => {
            return s.id == studentId;
        });
    }

    getClassById(classId) {
        return this.data.findIndex((c) => {
            return (c.id == classId);
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
