import { Component, OnInit } from '@angular/core';
import { dataService } from './../services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  student: any = {
    "email": null, 
    "id": null, 
    "username": ""
  }

  constructor(
    private dataService : dataService
  ) { 
    this.dataService.userInfo$.subscribe(userData => {
      let data: any = userData;
      this.student = data;
      if(this.student == null || this.student == undefined){
        this.student = {
          "email": null, 
          "id": null, 
          "username": null
        }
      }
    });
  }

  ngOnInit(): void {
  }

}
