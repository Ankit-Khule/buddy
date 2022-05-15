import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule
  ],
  declarations: [AdminComponent]
})
export class AdminModule { }