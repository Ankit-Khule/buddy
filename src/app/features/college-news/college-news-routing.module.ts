import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CollegeNewsComponent } from './college-news/college-news.component';


const ChildRoutes: Routes = [
  {
    path: '',
    component: CollegeNewsComponent
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
export class CollegeNewsRoutingModule { }
