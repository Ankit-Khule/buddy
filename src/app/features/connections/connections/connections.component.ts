import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { dataService } from './../../../services/data.service';
import { NgxUiLoaderService } from "ngx-ui-loader";

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css']
})
export class ConnectionsComponent implements OnInit {
  user:any;
  connections:any = [];
  isDisplayConnection: boolean = false;
  selectedConnection: any;
  isMessageBoxOpened:boolean = false;

  constructor(
    private dataService : dataService,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.dataService.student$.subscribe(user => {
      this.user = user;
    });
    this.getConnections();
  }

  getConnections(){
    this.ngxService.startLoader("loader-get-connections"); 
    this.dataService.getConnections(this.user).subscribe(response => {
       this.connections = response;
       this.connections = this.connections.filter((item:any) => item.studentid !== this.user.studentid);
       this.connections.forEach((connection: any, index : any) => {
          connection.image = "./../../../assets/images/image" + index + ".png";
       });
       this.ngxService.stopLoader("loader-get-connections");
    })
  }

  openConnectionInfo(connection: any){
    this.isDisplayConnection = true;
    this.selectedConnection = connection;
  }

  openConnections(){
    this.isDisplayConnection = false;
    this.isMessageBoxOpened = false;
  }

  displayBuddyInfo(event: any){
    this.isMessageBoxOpened = event;
  }

  displayMessageBox(event: any){
    this.isMessageBoxOpened = event;
  }
}
