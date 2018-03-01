
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyApp } from './app.component';
import { Camera } from '@ionic-native/camera';
import { EditStudentPage } from '../pages/edit-student/edit-student'
import { AddStudentPage } from '../pages/add-student/add-student'
import { PdfPage } from '../pages/pdf/pdf'
import { PopoverPage } from '../pages/popover/popover'
import { CameraPage } from '../pages/camera/camera'
import { CameraPreview } from '@ionic-native/camera-preview';
import { DataProvider } from '../providers/data-provider/data-provider';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { EmailComposer } from '@ionic-native/email-composer';
import { Base64 } from '@ionic-native/base64';
import { AuthentificationProvider } from '../providers/authentification/authentification';
import { StudentModalPage } from '../pages/student-modal/student-modal';
import { SelectImagesPage } from '../pages/select-images/select-images';
import { PincodeInputModule } from  'ionic2-pincode-input';
import { Toast } from '@ionic-native/toast';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { AddActivityPage } from '../pages/add-activity/add-activity';
import { ClassListPage } from '../pages/class-list/class-list';
import { StudentListPage } from '../pages/student-list/student-list';
import { ClassAddPage } from '../pages/class-add/class-add';
import { ClassEditPage } from '../pages/class-edit/class-edit';

@NgModule({
    declarations: [
        MyApp,
        EditStudentPage,
        AddStudentPage,
        PdfPage,
        PopoverPage,
        CameraPage,
        StudentModalPage,
        SelectImagesPage,
        AddActivityPage,
        ClassListPage,
        StudentListPage,
        ClassAddPage,
        ClassEditPage
    ],
    imports: [
        IonicStorageModule.forRoot({
            name: '__mydb',
            driverOrder: ['indexeddb', 'sqlite', 'websql']
        }),
        BrowserModule,
        PincodeInputModule,
        BrowserAnimationsModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        EditStudentPage,
        AddStudentPage,
        PdfPage,
        PopoverPage,
        CameraPage,
        StudentModalPage,
        SelectImagesPage,
        AddActivityPage,
        ClassListPage,
        StudentListPage,
        ClassAddPage,
        ClassEditPage
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
        EmailComposer,
        Base64,
        AuthentificationProvider,
        Toast,
        AndroidFullScreen
    ]
})
export class AppModule {}
