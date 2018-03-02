import { NgModule } from '@angular/core';
import { CameraComponent } from './camera/camera';
import { CustomCameraComponent } from './custom-camera/custom-camera';
@NgModule({
	declarations: [CameraComponent,
    CustomCameraComponent],
	imports: [],
	exports: [CameraComponent,
    CustomCameraComponent]
})
export class ComponentsModule {}
