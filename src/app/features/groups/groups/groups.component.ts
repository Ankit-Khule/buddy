import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  myGroups: any = [];
  allGroups: any = [];
  isMessageBoxOpened: boolean = false;
  selectedGroup: any;

  constructor() { }

  ngOnInit(): void {
    this.myGroups = [
      {
        name : 'Students of Msc in Data Science',
        members : 60,
        image : './../../../assets/images/profile-picture.jpg',
      },
      {
        name : 'Students from India',
        members : 150,
        image : './../../../assets/images/profile-picture.jpg',
      }
    ];

    this.allGroups = [
      {
        name : 'PHD Students',
        members : 250,
        image : './../../../assets/images/profile-picture.jpg',
      },
      {
        name : 'Post Graduate Students',
        members : 350,
        image : './../../../assets/images/profile-picture.jpg',
      },
      {
        name : 'Students of Msc in Business Analytics',
        members : 70,
        image : './../../../assets/images/profile-picture.jpg',
      },
      {
        name : 'Students of Msc in Information Systems with Computing',
        members : 50,
        image : './../../../assets/images/profile-picture.jpg',
      },
      {
        name : 'Students of Msc in Fintech',
        members : 40,
        image : './../../../assets/images/profile-picture.jpg',
      },
      {
        name : 'Students of Msc in Artificial Intelligence',
        members : 50,
        image : './../../../assets/images/profile-picture.jpg',
      }
    ];
  }

  openMessageBox(group: any){
    this.isMessageBoxOpened = true;
    this.selectedGroup = group;
  }

  displayBuddyInfo(event: any){
    this.isMessageBoxOpened = event;
  }

}
