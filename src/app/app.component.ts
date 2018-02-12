import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import {Photo} from "../database/tables/Photo";
import {Eleve} from "../database/tables/Eleve";
import { createConnection } from 'ionic-orm/dist'
import { HomePage } from '../pages/home/home';

import { DataProvider } from '../providers/data-provider/data-provider';

@Component({
    templateUrl: 'app.html',
    providers: [DataProvider]
})
export class MyApp {
    rootPage:any = HomePage;

<<<<<<< HEAD
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {

      createConnection({
        driver: {
          type: "websql",
          database: "test"
        },
        entities: [
          Eleve,
          Photo
        ],
        logging: {
          logFailedQueryError: true,
          logQueries: true,
          logSchemaCreation: true,
          logOnlyFailedQueries: true
        },
        autoSchemaSync: true,
      });


        // here you can start to work with your entities
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
=======
    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
>>>>>>> 3efd8fd3d69ef934d915d459698ebbf71a879a99
}
