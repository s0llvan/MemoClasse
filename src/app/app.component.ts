import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';

import { DataProvider } from '../providers/data-provider/data-provider';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';

@Component({
    templateUrl: 'app.html',
    providers: [DataProvider]
})export class MyApp {
    rootPage:any = HomePage;

    constructor(private androidFullScreen: AndroidFullScreen, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, modalCtrl: ModalController) {
        this.androidFullScreen.isImmersiveModeSupported()
        .then(() => this.androidFullScreen.immersiveMode())
        .catch((error: any) => console.log(error));

        platform.ready().then(() => {
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
}
