import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ProfileDetailsComponent } from './../../layout/profile-details/profile-details.component';


@NgModule({
  imports: [
    ProfileRoutingModule,
    CommonModule
  ],
  declarations: [
    ProfileComponent,
    ProfileDetailsComponent
  ]
})
export class ProfileModule { }