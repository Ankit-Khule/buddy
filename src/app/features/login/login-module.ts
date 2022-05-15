import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    LoginRoutingModule,
    CommonModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }