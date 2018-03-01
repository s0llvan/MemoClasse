import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClassEditPage } from './class-edit';

@NgModule({
  declarations: [
    ClassEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ClassEditPage),
  ],
})
export class ClassEditPageModule {}
