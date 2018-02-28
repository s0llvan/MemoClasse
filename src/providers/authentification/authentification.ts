import { Injectable } from '@angular/core';
import { Toast } from '@ionic-native/toast';

/*
Generated class for the AuthentificationProvider provider.

See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI.
*/
@Injectable()
export class AuthentificationProvider {

    is_admin = false;
    admin_pin = 1234;

    constructor(private toast: Toast) {
        this.admin_pin = (new Date()).getFullYear();
    }

    authAdmin(pin) {
        if(this.admin_pin == pin) {
            this.is_admin = true;
            this.toast.show('Mode administration', '4000', 'bottom');
        } else {
            this.toast.show('Code PIN incorrect !', '5000', 'bottom');
        }
    }

    deauthAdmin() {
        this.is_admin = false;
        this.toast.show('Mode élève', '4000', 'bottom');
    }

    isAdmin() {
        return this.is_admin;
    }
}
