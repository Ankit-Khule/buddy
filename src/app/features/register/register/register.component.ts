import { Component, OnInit } from '@angular/core';
import { dataService } from './../../../services/data.service';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isRegisterPageOpen: boolean;
  user: any =  {
    username : null,
    id : null,
    email : null,
    password : null
  }

  constructor(
    private dataService : dataService,
    private ngxService: NgxUiLoaderService,
    private router: Router,
    private toastr: ToastrService
  ) { 
    this.isRegisterPageOpen = true;
  }

  ngOnInit(): void {
  }

  registerNewUser(newUser: any){
    this.ngxService.startLoader("loader-register-newuser"); 
    this.dataService.registerNewUser(newUser).subscribe((response: any) => {
      if (response) {
        this.ngxService.stopLoader("loader-register-newuser");
        if(response === "You are already registered with this student id."){
          this.toastr.error(response);
        } else {
          this.toastr.success(response);
          this.router.navigate(['/login']);
        }
      }
    });
  }
}
