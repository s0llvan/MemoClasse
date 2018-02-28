import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectImagesPage } from './select-images';

@NgModule({
  declarations: [
    SelectImagesPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectImagesPage),
  ],
})
export class SelectImagesPageModule {}
