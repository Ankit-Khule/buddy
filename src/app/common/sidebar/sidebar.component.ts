import { Component, OnInit } from '@angular/core';
import { dataService } from './../../services/data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  student: any = {
    "email": null, 
    "id": null, 
    "username": ""
  }
  pipe = new DatePipe('en-US'); // Use your own locale
  todaysDate: any = this.pipe.transform(new Date(), 'yyyy-MM-dd');

  constructor(
    private dataService : dataService
  ) {
    // this.dataService.userInfo$.subscribe(userData => {
    //   let data: any = userData;
    //   this.student = data;
    //   console.log('sidebar data', this.student);
    //   if(this.student == null || this.student == undefined){
    //     this.student = {
    //       "email": null, 
    //       "id": null, 
    //       "username": ""
    //     }
    //   }
    // });

    this.dataService.student$.subscribe(userData => {
      let data: any = userData;
      this.student = data;
      console.log('sidebar data', this.student);
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

}
