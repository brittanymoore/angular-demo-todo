import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ToDoComponent } from './todo.component';
import { ToDoService } from './todo.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: ToDoComponent }]),
  ],
  declarations: [ToDoComponent],
  providers: [ToDoService],
})
export class ToDoModule {}
