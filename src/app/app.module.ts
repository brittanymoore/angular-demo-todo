import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { ToDoModule } from './todo/todo.module';
import { MockModule } from './mock/mock.module';
import { AppRoutingModule } from './app-routing.module';

let imports = [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    ToDoModule
];

// Include mocks if USE_MOCK is true.
if (process.env.USE_MOCK) {
    imports.push(MockModule);
}

@NgModule({
    imports: imports,
    declarations: [
        AppComponent
    ],
    providers: [ ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }