import { Component, OnInit } from '@angular/core';
import { dataService } from './../../../services/data.service';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-mentee',
  templateUrl: './my-mentee.component.html',
  styleUrls: ['./my-mentee.component.css']
})
export class MyMenteeComponent implements OnInit {
  isMessageBoxOpened:boolean = false;
  user:any;
  pipe = new DatePipe('en-US'); // Use your own locale
  mentee: any = {
    name : null,
    studentid : null,
    bio : null,
    module : null,
    startdate : null,
    enddate : null,
    country : null,
    hobby : null,
    isbuddy : false,
    studentassignedname : null,
    studentassignedid : null
  }

  constructor(
    private dataService : dataService,
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.dataService.student$.subscribe(user => {
      this.user = user;
    });
    this.getProfile();
  }

  displayBuddyInfo(event: any){
    this.isMessageBoxOpened = event;
  }

  displayMessageBox(event: any){
    this.isMessageBoxOpened = event;
  }

  getProfile(){
    this.ngxService.startLoader("loader-get-mentee"); 
    this.dataService.getStudentInfo(this.user.studentassignedid).subscribe(response => {
      let finalResponse = response;
      if (finalResponse !== "Profile not found.") {
        this.mentee = response;
        this.mentee.startdate = this.pipe.transform(this.mentee.startdate, 'yyyy-MM-dd');
        this.mentee.enddate = this.pipe.transform(this.mentee.enddate, 'yyyy-MM-dd');
        // this.dataService.updateStudentInfo(this.student);
      } else {
        this.toastr.info("Fill the details to save your profile.");
      }
      this.ngxService.stopLoader("loader-get-mentee");
    });
  }


}
