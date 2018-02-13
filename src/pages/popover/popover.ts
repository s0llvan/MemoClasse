import {NavController, ViewController} from "ionic-angular";
import {Component} from "@angular/core";
import {PdfPage} from '../pdf/pdf';

@Component({
    selector: 'popover',
    template: `
        <ion-list>
            <button ion-item (click)="close()">
                <ion-icon name="add-circle" class="menu-icon"></ion-icon>
                Élèves
            </button>
            <button ion-item (click)="close()">
                <ion-icon name="add-circle" class="menu-icon"></ion-icon>
                Classes
            </button>
            <button ion-item (click)="close()">
                <ion-icon name="add-circle" class="menu-icon"></ion-icon>
                Groupes
            </button>
            <button ion-item (click)="close()">
                <ion-icon name="add-circle" class="menu-icon"></ion-icon>
                Déconnexion
            </button>
            <button ion-item (click)="gotoPDF()">
                <ion-icon name="add-circle" class="menu-icon"></ion-icon>
                Voir le pdf
            </button>
        </ion-list>
    `
})
export class PopoverPage {
    constructor(public viewCtrl: ViewController, public navCtrl: NavController) {
    }

    close() {
        this.viewCtrl.dismiss();
    }

    gotoPDF() {
        this.navCtrl.push(PdfPage);
    }

}
