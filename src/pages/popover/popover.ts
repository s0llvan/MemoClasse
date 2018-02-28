import { NavController, ViewController } from "ionic-angular";
import { Component } from "@angular/core";
import { AuthentificationProvider } from '../../providers/authentification/authentification';
import { PdfPage } from "../pdf/pdf";
import { PincodeController } from  'ionic2-pincode-input/dist/pincode'

@Component({
    selector: 'popover',
    templateUrl: 'popover.html',
})
export class PopoverPage {
    constructor(public pincodeCtrl: PincodeController, public viewCtrl: ViewController, public navCtrl: NavController, public authentificationProvider: AuthentificationProvider) {

    }

    close() {
        this.viewCtrl.dismiss();
    }

    admin():any{
        if(!this.authentificationProvider.isAdmin())
        {
            let pinCode =  this.pincodeCtrl.create({
                title: 'Code PIN',
                hideForgotPassword: true,
                hideCancelButton: true,
                passSize: 4
            });

            pinCode.present();

            pinCode.onDidDismiss( (code,status) => {
                if(status === 'done'){
                    this.authentificationProvider.authAdmin(code);
                }
            })
        }
        else
        {
            this.authentificationProvider.deauthAdmin();
        }

        this.viewCtrl.dismiss();
    }
}
