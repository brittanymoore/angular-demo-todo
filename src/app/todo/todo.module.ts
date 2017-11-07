import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ToDoService } from './todo.service';
import { ToDoComponent } from './todo.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: '', component: ToDoComponent }
        ])
    ],
    declarations: [ ToDoComponent ],
    providers: [ ToDoService ]
})
export class ToDoModule { }
