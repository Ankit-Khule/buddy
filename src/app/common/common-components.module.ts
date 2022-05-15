import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { NgxUiLoaderModule } from "ngx-ui-loader";

import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxUiLoaderModule
  ],
  declarations: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent
 
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
    FooterComponent
  ],
  providers: [
  
  ],
  entryComponents: [
   
  ]
})
export class CommonComponentsModule { }
