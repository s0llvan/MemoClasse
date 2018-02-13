
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Camera } from '@ionic-native/camera';
import { EditStudentPage } from '../pages/edit-student/edit-student'
import { AddStudentPage } from '../pages/add-student/add-student'
import { PdfPage } from '../pages/pdf/pdf'

import { DataProvider } from '../providers/data-provider/data-provider';

import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        EditStudentPage,
        AddStudentPage,
        PdfPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        EditStudentPage,
        AddStudentPage,
        PdfPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Camera,
        DataProvider,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        File,
        FileOpener
    ]
})
export class AppModule {}
