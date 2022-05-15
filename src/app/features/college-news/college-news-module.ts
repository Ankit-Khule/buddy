import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CollegeNewsComponent } from './college-news/college-news.component';
import { CollegeNewsRoutingModule } from './college-news-routing.module';

@NgModule({
  imports: [
    CollegeNewsRoutingModule,
    CommonModule
  ],
  declarations: [CollegeNewsComponent]
})
export class CollegeNewsModule { }