import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data-provider/data-provider';

@IonicPage()
@Component({
    selector: 'page-class-add',
    templateUrl: 'class-add.html',
})
export class ClassAddPage {

    public class = { id: 0, name: "" };

    constructor(private dataProvider: DataProvider, public navCtrl: NavController, public navParams: NavParams) {

    }
    back(){
        this.navCtrl.pop();
    }

    addClass() {
        this.dataProvider.addClass(this.class);
        this.navCtrl.pop();
    }
}
