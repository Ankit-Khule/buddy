import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ConnectionsComponent } from './connections/connections.component';


const ChildRoutes: Routes = [
  {
    path: '',
    component: ConnectionsComponent
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
export class ConnectionsRoutingModule { }
