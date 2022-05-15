import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GroupsComponent } from './groups/groups.component';
import { GroupsRoutingModule } from './groups-routing.module';

@NgModule({
  imports: [
    GroupsRoutingModule,
    CommonModule
  ],
  declarations: [GroupsComponent]
})
export class GroupsModule { }