import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data-provider/data-provider';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home'

/**
* Generated class for the EditStudentPage page.
*
* See https://ionicframework.com/docs/components/#navigation for more info on
* Ionic pages and navigation.
*/

@IonicPage()
@Component({
    selector: 'page-edit-student',
    templateUrl: 'edit-student.html',
})
export class EditStudentPage {

    public student = { mails: [] };

    constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider: DataProvider, public alertCtrl: AlertController) {
        this.student = navParams.get("student");
    }

    addStudentMail() {
        this.saveStudent();
    }

    saveStudent() {
        this.dataProvider.updateStudent(this.student);
    }

    saveStudentAndBack() {
        this.dataProvider.updateStudent(this.student);
        this.navCtrl.pop();
    }

    deleteStudent() {
        let confirm = this.alertCtrl.create({
            title: 'Voulez-vous vraiment supprimer cet élève ?',
            message: "Toutes les informations et photos de l'élève seront supprimées.",
            buttons: [
                {
                    text: 'Non',
                    handler: () => {}
                },
                {
                    text: 'Oui',
                    handler: () => {
                        this.dataProvider.deleteStudent(this.student);
                        this.navCtrl.push(HomePage);

                    }
                }
            ]
        });
        confirm.present();
    }
}
