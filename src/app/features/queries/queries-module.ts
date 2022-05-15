import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QueriesComponent } from './queries/queries.component';
import { QueriesRoutingModule } from './queries-routing.module';

@NgModule({
  imports: [
    QueriesRoutingModule,
    CommonModule
  ],
  declarations: [QueriesComponent]
})
export class QueriesModule { }