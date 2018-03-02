import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

/*
Generated class for the AuthentificationProvider provider.

See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI.
*/
@Injectable()
export class AuthentificationProvider {

    is_admin = false;
    admin_pin = 1234;

    constructor(private toastCtrl: ToastController) {
        this.admin_pin = (new Date()).getFullYear();
    }

    authAdmin(pin) {
        if(this.admin_pin == pin) {
            this.is_admin = true;

            let toast = this.toastCtrl.create({
                message: 'Mode administration',
                duration: 4000,
                position: 'bottom',
                cssClass: "toast"
            });
            toast.present();
        } else {
            let toast = this.toastCtrl.create({
                message: 'Code PIN incorrect !',
                duration: 4000,
                position: 'bottom',
                cssClass: "toast"
            });
            toast.present();
        }
        return this.is_admin;
    }

    deauthAdmin() {
        this.is_admin = false;

        let toast = this.toastCtrl.create({
            message: 'Mode élève',
            duration: 4000,
            position: 'bottom',
            cssClass: "toast"
        });
        toast.present();
    }

    isAdmin() {
        return this.is_admin;
    }
}
