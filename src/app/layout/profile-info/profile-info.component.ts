import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.css']
})
export class ProfileInfoComponent implements OnInit {

  @Input() profileData: any;
  @Output() displayMessageBox = new EventEmitter<string>();

  isMessageBoxOpened:any = false;

  constructor() { }

  ngOnInit(): void {
  
  }

  openMessageBox(){
    this.isMessageBoxOpened = true;
    this.displayMessageBox.emit(this.isMessageBoxOpened);
  }

}
