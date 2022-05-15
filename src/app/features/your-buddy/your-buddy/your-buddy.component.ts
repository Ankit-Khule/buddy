import { Component, OnInit } from '@angular/core';
import { dataService } from './../../../services/data.service';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { ToastrService } from 'ngx-toastr';
import { ProfileDetailsComponent } from 'src/app/layout/profile-details/profile-details.component';

@Component({
  selector: 'app-your-buddy',
  templateUrl: './your-buddy.component.html',
  styleUrls: ['./your-buddy.component.css']
})
export class YourBuddyComponent implements OnInit {

  isMessageBoxOpened:boolean = false;
  user:any;
  unassignedBuddies: any;
  filteredBuddy: any;
  buddyAssigned: boolean = false;

  buddy: any = {
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
    private toastr: ToastrService,
    private profileDetailComponent : ProfileDetailsComponent
  ) { }

  ngOnInit(): void {
    this.buddy = {};
    this.dataService.student$.subscribe(user => {
      this.user = user;
      if(this.user){
        this.checkBuddyAssignedOrNot();
      }
    });
  }

  checkBuddyAssignedOrNot(){
    this.ngxService.startLoader("loader-get-buddies");
    this.dataService.getYourAssignedBuddy(this.user.studentid).subscribe(response => {
      if (response !== "Profile not found.") {
        this.buddy = response;
        this.buddyAssigned = true;
      } else {
        this.buddyAssigned = false;
      }
      this.ngxService.stopLoader("loader-get-buddies");
    });
  }

  displayBuddyInfo(event: any){
    this.isMessageBoxOpened = event;
  }

  displayMessageBox(event: any){
    this.isMessageBoxOpened = event;
  }

  findBestBuddy(buddies: any){
    if(buddies.length > 0){
      this.filteredBuddy = buddies.filter( (b: any) => {
        if(b.module === this.user.module && b.country === this.user.country && b.hobby === this.user.hobby){
          return b;
        }
      });
       
      if(this.filteredBuddy.length > 0){
        return this.filteredBuddy[0];
      }
      if(this.filteredBuddy.length === 0){
        this.filteredBuddy = buddies.filter( (b: any) => b.module === this.user.module && b.country === this.user.country);
        if(this.filteredBuddy.length > 0){
          return this.filteredBuddy[0];
        }
        if(this.filteredBuddy.length === 0){
          this.filteredBuddy = buddies.filter( (b: any) => b.module === this.user.module && b.hobby === this.user.hobby);
          if(this.filteredBuddy.length > 0){
            return this.filteredBuddy[0];
          }
          if(this.filteredBuddy.length === 0){
           this.filteredBuddy = buddies.filter( (b: any) => b.module === this.user.module);
           if(this.filteredBuddy.length > 0){
            return this.filteredBuddy[0];
          }
          
          if(this.filteredBuddy.length === 0){
            return buddies[0];
          }
          }
        }
      }
    }
  }

  assignBuddy(){
    this.ngxService.startLoader("loader-get-buddies"); 
    this.dataService.getUnassignedBuddies().subscribe(response => {
      let res: any = response;
      if (res.length > 0) {
        this.unassignedBuddies = response;
        this.buddy = this.findBestBuddy(this.unassignedBuddies);
        if(this.buddy != undefined || this.buddy != null){
          this.buddy.studentassignedid = this.user.studentid;
          this.buddy.studentassignedname = this.user.name;
          this.profileDetailComponent.updateProfile(this.buddy,'buddyUpdated');
          this.toastr.success("Buddy is assigned to you successfully!");
        } else{
          this.toastr.info('No Buddy found for you. We will keep you updated soon on this page.');
        }
        this.buddyAssigned = true;
        this.ngxService.stopLoader("loader-get-buddies");
      } else {
        this.ngxService.stopLoader("loader-get-buddies");
        this.toastr.info('No Buddy found for you. We will keep you updated soon on this page.');
      }
    });
  }

}
