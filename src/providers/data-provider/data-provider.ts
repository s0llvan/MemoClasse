import { Injectable } from '@angular/core';

@Injectable()
export class DataProvider {

    public students: any = [];

    constructor() {
        this.initializeStudents();
    }

    initializeStudents() {
        this.students = [
            { id:1, firstname: "John", lastname: "Doe", mails: ["mail@domain.com","mail2@domain.com"]},
            { id:2, firstname: "Jean", lastname: "Van Damme", mails: ["mail@domain.com","mail2@domain.com"]},
            { id:3, firstname: "Chris", lastname: "Markley", mails: ["mail@domain.com","mail2@domain.com"]},
            { id:4, firstname: "Jessica", lastname: "Roe", mails: ["mail@domain.com","mail2@domain.com"]},
            { id:5, firstname: "Michael", lastname: "Tang", mails: ["mail@domain.com","mail2@domain.com"]},
            { id:6, firstname: "Stacy", lastname: "Willard", mails: ["mail@domain.com","mail2@domain.com"]},
            { id:7, firstname: "Leonardo", lastname: "Mason", mails: ["mail@domain.com","mail2@domain.com"]},
            { id:8, firstname: "Lee", lastname: "Winters", mails: ["mail@domain.com","mail2@domain.com"]},
            { id:9, firstname: "Mary", lastname: "Wilson", mails: ["mail@domain.com","mail2@domain.com"]},
        ];
    }

    addStudent(student) {
        this.students.push(student);
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
    }

    deleteStudent(student) {
        this.students.splice(this.students.indexOf(student), 1);
    }
}
