import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConnectionsRoutingModule } from './connections-routing.module';
import { ConnectionsComponent } from './connections/connections.component';

@NgModule({
  imports: [
    ConnectionsRoutingModule,
    CommonModule
  ],
  declarations: [ConnectionsComponent]
})
export class ConnectionsModule { }