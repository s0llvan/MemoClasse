import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WatchStudentPage } from './watch-student';


@NgModule({
  declarations: [
    WatchStudentPage,
  ],
  imports: [
    IonicPageModule.forChild(WatchStudentPage),
  ],
})
export class WatchStudentPageModule {}
