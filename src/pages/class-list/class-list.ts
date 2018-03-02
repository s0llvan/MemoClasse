import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data-provider/data-provider';
import { Events } from 'ionic-angular';
import { StudentListPage } from "../student-list/student-list";
import { ModalController } from 'ionic-angular';
import { ClassAddPage } from "../class-add/class-add";
import { AuthentificationProvider } from '../../providers/authentification/authentification';

@IonicPage()
@Component({
    selector: 'page-class-list',
    templateUrl: 'class-list.html',
})
export class ClassListPage {

    public data = [];

    constructor(private authentificationProvider: AuthentificationProvider, public modalCtrl: ModalController, public events: Events, private dataProvider: DataProvider, public navCtrl: NavController, public navParams: NavParams)
    {
        this.events.subscribe('class:updated', (data) => {
            this.data = data;
        });

        this.data = this.dataProvider.data;
    }

    selectClass(_class) {
        this.navCtrl.push(StudentListPage, { class: _class} );
    }

    addClass(_class) {
        let modal = this.modalCtrl.create(ClassAddPage, { class: _class});
        modal.present();
    }
}
