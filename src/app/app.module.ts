import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { ToDoModule } from './todo/todo.module';
import { MockModule } from './mock/mock.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule,
        ToDoModule,
        MockModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [ ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
