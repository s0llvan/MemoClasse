import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data-provider/data-provider';
import {createConnection} from "ionic-orm";
import {Eleve} from "../../database/tables/Eleve";

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
        createConnection(/*...*/).then(async connection => {

          let eleve = new Eleve();
          eleve.email1 = this.student.mails[1];
          eleve.email2 = this.student.mails[2];
          eleve.firstname = this.student.firstname;
          eleve.lastname = this.student.lastname;

          let photoRepository = connection.getRepository(Eleve);

          await photoRepository.persist(eleve);
          console.log("Photo has been saved");

          let savedPhotos = await photoRepository.find();
          console.log("All photos from the db: ", savedPhotos);

      });
    }

    addStudentMail(mail) {
        this.student.mails.push(this.mail);
        this.mail = "";
    }

    back() {
        this.navCtrl.pop();
    }
}
