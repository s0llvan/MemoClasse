import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PdfPage } from './pdf';

@NgModule({
  declarations: [
    PdfPage,
  ],
  imports: [
    IonicPageModule.forChild(PdfPage),
  ],
})
export class PdfPageModule {}
