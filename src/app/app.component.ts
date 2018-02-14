import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { EmailComposer } from '@ionic-native/email-composer'

import { HomePage } from '../pages/home/home';

import { DataProvider } from '../providers/data-provider/data-provider';

@Component({
    templateUrl: 'app.html',
    providers: [DataProvider]
})export class MyApp {
    rootPage:any = HomePage;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
        platform.ready().then(() => {
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
}
