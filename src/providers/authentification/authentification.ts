import { Injectable } from '@angular/core';

/*
Generated class for the AuthentificationProvider provider.

See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI.
*/
@Injectable()
export class AuthentificationProvider {

    public is_admin = false;
    public admin_pin = 1234;

    constructor() {

    }

    pinIsValid(pin) {
        return this.admin_pin == pin;
    }

    isAdmin() {
        return this.is_admin;
    }
}
