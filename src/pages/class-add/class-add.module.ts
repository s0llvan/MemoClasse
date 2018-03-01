import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClassAddPage } from './class-add';

@NgModule({
  declarations: [
    ClassAddPage,
  ],
  imports: [
    IonicPageModule.forChild(ClassAddPage),
  ],
})
export class ClassAddPageModule {}
