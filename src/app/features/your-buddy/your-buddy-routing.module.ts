import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { YourBuddyComponent } from './your-buddy/your-buddy.component';


const ChildRoutes: Routes = [
  {
    path: '',
    component: YourBuddyComponent
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
export class YourBuddyRoutingModule { }
