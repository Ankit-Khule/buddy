import { Component, OnInit } from '@angular/core';
import { dataService } from './../../services/data.service';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  student: any = {
    "email": null, 
    "id": null, 
    "username": ""
  }

  constructor(
    private dataService : dataService,
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService
  ) { 
    this.dataService.userInfo$.subscribe(userData => {
      let data: any = userData;
      this.student = data;
      if(this.student == null || this.student == undefined){
        this.student = {
          "email": null, 
          "id": null, 
          "username": ""
        }
      }
    });
  }

  ngOnInit(): void {
  }

  logout(){
    this.ngxService.startLoader("loader-get-logout");
    this.student = {
      "email": null, 
      "id": null, 
      "username": null
    }
    this.dataService.saveUserLoginInfo(this.student);
    this.ngxService.stopLoader("loader-get-logout");
    this.toastr.success("You are logged out now. You need to login again.");
  }

}
