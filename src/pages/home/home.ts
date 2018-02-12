import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    public students = [
        { firstname: "John", lastname: "Doe"},
        { firstname: "Jean", lastname: "Van Damme"},
        { firstname: "Chris", lastname: "Markley"},
        { firstname: "Jessica", lastname: "Roe"},
        { firstname: "Michael", lastname: "Tang"},
        { firstname: "Stacy", lastname: "Willard"},
        { firstname: "Leonardo", lastname: "Mason"},
        { firstname: "Lee", lastname: "Winters"},
        { firstname: "Mary", lastname: "Wilson"},
    ];

    constructor(private camera: Camera) {

    }
}
