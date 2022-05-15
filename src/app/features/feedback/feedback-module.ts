import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackComponent } from './feedback/feedback.component';

@NgModule({
  imports: [
    FeedbackRoutingModule,
    CommonModule
  ],
  declarations: [FeedbackComponent]
})
export class GroupsModule { }