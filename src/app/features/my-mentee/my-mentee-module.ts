import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MyMenteeRoutingModule } from './my-mentee-routing.module';
import { MyMenteeComponent } from './my-mentee/my-mentee.component';

@NgModule({
  imports: [
    MyMenteeRoutingModule,
    CommonModule
  ],
  declarations: [MyMenteeComponent]
})
export class MyMenteeModule { }