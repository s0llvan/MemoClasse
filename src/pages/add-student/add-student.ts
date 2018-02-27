import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data-provider/data-provider';
import { ToastController } from 'ionic-angular';

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

    public student = { id: 0, firstname:null, lastname:null, mails: [], pictures: [] };

    constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider: DataProvider, private toastController: ToastController) {

    }

    addStudent() {
        if(this.student.firstname == null) {
            this.toastError("Vous devez rentrer un prénom !");
        } else if(this.student.lastname == null) {
            this.toastError("Vous devez rentrer un nom !");
        } else if(Object.keys(this.student.mails).length <= 0) {
            this.toastError("Vous devez rentrer au moins une adresse email !")
        } else {
            this.dataProvider.addStudent(this.student);
            this.navCtrl.pop();
        }
    }

    back() {
        this.navCtrl.pop();
    }

    toastError(msg) {
        let toast = this.toastController.create({
            message: msg,
            duration: 3000,
            position: 'top',
            cssClass: "toast"
        });
        toast.present();
    }
}
