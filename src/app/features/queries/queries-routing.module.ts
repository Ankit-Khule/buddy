import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { QueriesComponent } from './queries/queries.component';


const ChildRoutes: Routes = [
  {
    path: '',
    component: QueriesComponent
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
export class QueriesRoutingModule { }
