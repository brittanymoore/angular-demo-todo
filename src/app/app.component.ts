import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    title = "My Todo App";
}