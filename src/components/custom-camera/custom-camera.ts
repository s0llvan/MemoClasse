import { Component } from '@angular/core';

/**
 * Generated class for the CustomCameraComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'custom-camera',
  templateUrl: 'custom-camera.html'
})
export class CustomCameraComponent {

  text: string;

  constructor() {
    console.log('Hello CustomCameraComponent Component');
    this.text = 'Hello World';
  }

}
