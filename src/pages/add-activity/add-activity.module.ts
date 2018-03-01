import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddActivityPage } from './add-activity';

@NgModule({
  declarations: [
    AddActivityPage,
  ],
  imports: [
    IonicPageModule.forChild(AddActivityPage),
  ],
})
export class AddActivityPageModule {}
