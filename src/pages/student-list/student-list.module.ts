import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentListPage } from './student-list';

@NgModule({
    declarations: [
        StudentListPage,
    ],
    imports: [
        IonicPageModule.forChild(StudentListPage),
    ],
})
export class StudentListPageModule {}
