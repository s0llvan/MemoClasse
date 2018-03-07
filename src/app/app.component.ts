import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ClassListPage } from '../pages/class-list/class-list';
import { AboutPage } from '../pages/about/about';
import { HelpPage } from '../pages/help/help';

import { DataProvider } from '../providers/data-provider/data-provider';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { AuthentificationProvider } from '../providers/authentification/authentification';
import { PincodeController } from  'ionic2-pincode-input/dist/pincode'

@Component({
    templateUrl: 'app.html',
    providers: [DataProvider]
})export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage:any = ClassListPage;

    pages: Array<{ title: string, component: any, icon: string }>;
    footerPages: Array<{ title: string, component: any, icon: string }>;

    constructor(public pincodeCtrl: PincodeController, private authentificationProvider: AuthentificationProvider, private androidFullScreen: AndroidFullScreen, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, modalCtrl: ModalController) {

        this.androidFullScreen.isImmersiveModeSupported()
        .then(() => this.androidFullScreen.immersiveMode())
        .catch((error: any) => console.log(error));

        platform.ready().then(() => {
            statusBar.styleDefault();
            splashScreen.hide();
        });

        this.pages = [
            { title: 'Accueil', component: ClassListPage, icon: "home" },
            { title: 'Administration', component: null, icon: "lock" },
            { title: 'Aide', component: HelpPage, icon: "help" },
        ];

        this.footerPages = [
            { title: 'A propos', component: AboutPage, icon: "information-circle" }
        ];
    }

    openPage(page) {
        if(page.component != null) {
            if(page.title == "Aide") {
                this.nav.push(page.component);
            } else {
                this.nav.setRoot(page.component);
            }
        } else  {
            if(page.title == "Administration" || page.title == "Administration (Quitter)") {
                this.authAdmin();
            }
        }
    }

    authAdmin() {
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
                    if(this.authentificationProvider.authAdmin(code)) {
                        this.pages[1].title = "Administration (Quitter)";
                    }
                }
            })
        }
        else
        {
            this.authentificationProvider.deauthAdmin();
            this.pages[1].title = "Administration";
        }
    }
}
