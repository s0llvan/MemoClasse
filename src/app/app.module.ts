
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Camera } from '@ionic-native/camera';
import { EditStudentPage } from '../pages/edit-student/edit-student'
import { AddStudentPage } from '../pages/add-student/add-student'

import { PdfPage } from '../pages/pdf/pdf'
import { PopoverPage } from '../pages/popover/popover'
import { CameraPage } from '../pages/camera/camera'
import { CameraPreview } from '@ionic-native/camera-preview';
import { WatchStudentPage } from '../pages/watch-student/watch-student'

import { EmailComposer } from '@ionic-native/email-composer'

import { DataProvider } from '../providers/data-provider/data-provider';

import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        EditStudentPage,
        AddStudentPage,
        PdfPage,
        PopoverPage,
        CameraPage,
        WatchStudentPage
    ],
    imports: [
      IonicStorageModule.forRoot({
         name: '__mydb',
            driverOrder: ['indexeddb', 'sqlite', 'websql']
      }),
      BrowserModule,
      IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        EditStudentPage,
        AddStudentPage,
        PdfPage,
        PopoverPage,
        CameraPage,
        WatchStudentPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Camera,
        DataProvider,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        File,
        FileOpener,
        CameraPreview,
        EmailComposer
    ]
})
export class AppModule {}
