import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { dataService } from './../../services/data.service';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {

  profileInfoSaved: boolean = false;
  informationSaved: boolean = false;
  studentImage: any;
  pipe = new DatePipe('en-US'); // Use your own locale
  studentNotAssgined: any;
  studentId: any;
  todaysDate: any = this.pipe.transform(new Date(), 'yyyy-MM-dd');
  studentCopy: any = {
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

  student: any = {
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

  modules = [
    'MSc in Data Analytics',
    'MSc in Information System with Computing',
    'MSc in Business Analytics',
    'MSc in FinTech',
    'MSc in Artificial Intelligence',
    'MSc in Cyber Security',
    'MSc in Financial Analytics',
    'For Admin Only'
    ];

  countries = [
    'India',
    'China',
    'Sri Lanka',
    'Bangladesh',
    'Nepal',
    'Bhutan',
    'Ireland',
    'United States of America',
    'Mexico',
    'Norway',
    'Switzerland',
    'Italy',
    'Germany',
    'Belgium',
    'Amsterdam'
  ];

  selectedFile: ImageSnippet | undefined;

  constructor(
    private dataService : dataService,
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService,
    private router: Router
  ) { 
    this.dataService.userInfo$.subscribe(userData => {
      let data: any = userData;
      this.studentId = data.id;
      this.student.studentid = data.id;
      this.student.name = data.username;
    });
  }

  ngOnInit(): void {
    this.getProfile();
    this.studentNotAssgined = "Not Yet Assigned";
  }

  saveProfile(student:any){
    this.ngxService.startLoader("loader-get-profile"); 
    this.dataService.addStudentInfo(student).subscribe(response => {
      if (response) {
        this.student = response;
        this.student.startdate = this.pipe.transform(this.student.startdate, 'yyyy-MM-dd');
        this.student.enddate = this.pipe.transform(this.student.enddate, 'yyyy-MM-dd');
        this.studentCopy = {...this.student};
        this.informationSaved = true;
        this.ngxService.stopLoader("loader-get-profile");
        this.toastr.success("Your profile is saved successfully.");
      }
    });
  }

  updateProfile(student:any,status: any){
    if(status === 'yesBuddy'){
      student.isbuddy = true;
    }
    if(student.studentassignedid == null && student.studentassignedname == null){
       student.studentassignedid = null;
       student.studentassignedname = '';
    }
    this.ngxService.startLoader("loader-get-profile"); 
    this.dataService.updateProfile(student).subscribe(response => {
      if (response) {
        this.student = response;
        this.student.startdate = this.pipe.transform(this.student.startdate, 'yyyy-MM-dd');
        this.student.enddate = this.pipe.transform(this.student.enddate, 'yyyy-MM-dd');
        this.ngxService.stopLoader("loader-get-profile");
        this.toastr.success("Your profile is updated successfully.");
      }
    }); 
  }

  getProfile(){
    this.ngxService.startLoader("loader-get-profile"); 
    this.dataService.getStudentInfo(this.studentId).subscribe(response => {
      let finalResponse = response;
      if (finalResponse !== "Profile not found.") {
        this.student = response;
        this.studentCopy = {...this.student};
        this.informationSaved = true;
        this.student.startdate = this.pipe.transform(this.student.startdate, 'yyyy-MM-dd');
        this.student.enddate = this.pipe.transform(this.student.enddate, 'yyyy-MM-dd');
        this.dataService.updateStudentInfo(this.student);
      } else {
        this.studentCopy = {...this.student};
        this.toastr.info("Fill the details to save your profile.");
      }
      this.ngxService.stopLoader("loader-get-profile");
    });
  }

  openMentee(){
    this.router.navigate(['/myMentee']);
  }
  
  processProfileImage(profileImage: any) {
    const file: File = profileImage.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);
      // remove this later
      const formData = new FormData();

      formData.append('image', this.selectedFile.file);
       // remove this later

      // this.dataService.uploadProfileImage(this.selectedFile.file).subscribe(
      //   (response) => {
      //     this.studentImage = response;
      //   },
      //   (error) => {
      //     console.log(error);
      //   });
    });

    reader.readAsDataURL(file);
  }
}
