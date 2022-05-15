import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { YourBuddyRoutingModule } from './your-buddy-routing.module';
import { YourBuddyComponent } from './your-buddy/your-buddy.component';

@NgModule({
  imports: [
    YourBuddyRoutingModule,
    CommonModule
  ],
  declarations: [YourBuddyComponent]
})
export class YourBuddyModule { }