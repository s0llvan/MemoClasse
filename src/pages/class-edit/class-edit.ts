import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data-provider/data-provider';

@IonicPage()
@Component({
    selector: 'page-class-edit',
    templateUrl: 'class-edit.html',
})
export class ClassEditPage {

    public class: any;

    constructor(private dataProvider: DataProvider, public navCtrl: NavController, public navParams: NavParams) {
        this.class = this.navParams.get("class");
    }

    saveClass() {
        this.dataProvider.updateClass(this.class);
        this.navCtrl.pop();
    }

    deleteClass() {
        this.dataProvider.deleteClass(this.class);
        this.navCtrl.pop();
    }

    back() {
        this.navCtrl.pop();
    }
}
