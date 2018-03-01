import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data-provider/data-provider';
import { Events } from 'ionic-angular';
import { AuthentificationProvider } from '../../providers/authentification/authentification';
import { StudentListPage } from "../student-list/student-list";
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from "../popover/popover";
import { ModalController } from 'ionic-angular';
import { ClassAddPage } from "../class-add/class-add";

@IonicPage()
@Component({
    selector: 'page-class-list',
    templateUrl: 'class-list.html',
})
export class ClassListPage {

    public data = [];

    constructor(public modalCtrl: ModalController, public popoverCtrl: PopoverController, public authentificationProvider: AuthentificationProvider, public events: Events, private dataProvider: DataProvider, public navCtrl: NavController, public navParams: NavParams)
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

    presentPopover(event) {
        let popover = this.popoverCtrl.create(PopoverPage);
        popover.present({
            ev: event
        });
    }
}
