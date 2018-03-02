import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data-provider/data-provider';
import { ClassListPage } from "../class-list/class-list";
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-class-edit',
    templateUrl: 'class-edit.html',
})
export class ClassEditPage {

    public class: any;

    constructor(public alertCtrl: AlertController, private dataProvider: DataProvider, public navCtrl: NavController, public navParams: NavParams) {
        this.class = this.navParams.get("class");
    }

    saveClass() {
        this.dataProvider.updateClass(this.class);
        this.navCtrl.pop();
    }

    deleteClass() {
        let confirm = this.alertCtrl.create({
            title: 'Voulez-vous vraiment supprimer cette classe ?',
            message: "Toutes les informations de cette classe et des élèves seront supprimées.",
            buttons: [
                {
                    text: 'Non',
                    handler: () => {}
                },
                {
                    text: 'Oui',
                    handler: () => {
                        this.dataProvider.deleteClass(this.class);
                        this.navCtrl.setRoot(ClassListPage);
                    }
                }
            ]
        });
        confirm.present();
    }

    back() {
        this.navCtrl.pop();
    }
}
