import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-help',
    templateUrl: 'help.html',
})
export class HelpPage {

    constructor(public navCtrl: NavController) {

    }

    slides = [
        {
            title: "Bienvenu sur MémoClasse !",
            description: "Faites sortir les créations des enfants des murs de l'école",
            image: "assets/imgs/icon.png",
        },
        {
            title: "Comment fonctionne MémoClasse?",
            description: "<b>Dans la partie élève,</b><p>ils pourront prendre des photos de leurs créations.</p>",
            image: "assets/imgs/non_admin.svg",
        },
        {
            title: "Comment fonctionne MémoClasse?",
            description: "<b>Dans la partie administration,</b><p>vous pourrez, gérer la création et modification des classes et élèves, générer des mails à envoyer au parents contenant les créations des enfants.</p><p>Pour vous connecter le mot de passe est l'année courante, donc :"+(new Date()).getUTCFullYear()+".</p>",
            image: "assets/imgs/admin.svg",
        }
    ];

    close() {
        this.navCtrl.pop();
    }
}
