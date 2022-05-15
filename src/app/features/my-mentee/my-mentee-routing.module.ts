import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MyMenteeComponent } from './my-mentee/my-mentee.component';


const ChildRoutes: Routes = [
  {
    path: '',
    component: MyMenteeComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ChildRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class MyMenteeRoutingModule { }
