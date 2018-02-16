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

    public student = { id: 0, firstname:"",lastname:"",mails: [], pictures: [] };
    public mail: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider: DataProvider, private toastController: ToastController) {

    }

    addStudent() {
      if( this.student.firstname == null || this.student.lastname == null || Object.keys(this.student.mails).length == 0)
      {
        this.toastError();
      }
      else {
        this.dataProvider.addStudent(this.student);
        this.navCtrl.pop();
      }

    }

    addStudentMail(mail) {
        this.student.mails.push(this.mail);
        this.mail = "";
    }

    back() {
        this.navCtrl.pop();
    }


    toastError() {
    let toast = this.toastController.create({
      message: 'Les champs ne doivent pas être vides !',
      duration: 3000,
      position: 'top',
      cssClass: "toast"
    });
    toast.present();
  }
}
