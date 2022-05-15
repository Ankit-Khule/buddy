import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { dataService } from './../../services/data.service';
import * as moment from 'moment';
// import { SocketService } from 'src/app/services/chat-socketio.service';
// import { Socket } from 'ngx-socket-io'; 

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() userInfo:any;
  @Input() studentInfo:any;
  @Output() displayBuddyInfo = new EventEmitter<string>();
  showMessageBox:any;
  message:any = '';
  yourMessage:any = [];
  duplicateMessagesArray:any = [];

  constructor(
    // private socketService: SocketService,
    // private socket: Socket
    private dataService : dataService
  ) { }

  ngOnInit(): void {
    let messagersId = this.studentInfo.studentid + " " +this.userInfo.studentid;
    this.dataService.getMessages(messagersId).subscribe(response => {
      if (response != null) {
       let messagesArray: any = response;
       (response);
       messagesArray.forEach((element : any) => {
        this.yourMessage.push(element);
       });
       
       this.duplicateMessagesArray = JSON.parse(JSON.stringify(this.yourMessage));
       this.duplicateMessagesArray.sort(function(x: any, y: any){
            let date1: any = new Date(x.message_publish_time);
            let date2 : any= new Date(y.message_publish_time);
            return date1 - date2 ;
        });
        console.log('sorted messages array', this.duplicateMessagesArray);
      }
    });
    // console.log('this.socekt',this.socket);
    // this.socket.on('connect', () =>{
    //   this.socket.emit('handleMessage', {data: 'I\'m connected!'});
    // })
		// this.socketService.getNewMessages().subscribe((data: any) => {
    //   this.yourMessage.push(data);
    //   this.duplicateMessagesArray = JSON.parse(JSON.stringify(this.yourMessage));
    // });
  }

  openBuddyInfo(){
    this.showMessageBox = false;
    this.displayBuddyInfo.emit(this.showMessageBox);
  }

  sendMessage(message:any){
    this.yourMessage = {
      sender_name : this.studentInfo.name,
      message_publish_time : moment(new Date()).format('DD-MM-YYYY HH:mm'),
      messages : message
    }
    this.duplicateMessagesArray.push(JSON.parse(JSON.stringify(this.yourMessage)));
    let requestBody = {
      messagers_id : "",
      messages : "",
      message_publish_time : new Date(),
      sender_name : ""
    }
    requestBody.messagers_id = this.studentInfo.studentid + " " +this.userInfo.studentid;
    requestBody.messages = message;
    requestBody.sender_name = this.studentInfo.name;
    this.dataService.sendMessages(requestBody).subscribe(response => {
      if (response != null) {
       this.message = '';
       let objDiv = document.getElementById("messageBox");
       if(objDiv){
        objDiv.focus({preventScroll:false});;
       }
      }
    });
    // this.socketService.sendMessages(message);

    // this.socketService.getNewMessages().subscribe((data: any) => {
    //   this.yourMessage.push(data);
    //   this.duplicateMessagesArray = JSON.parse(JSON.stringify(this.yourMessage));
    // });

    // this.socket.on('my response', function(msg: any){
    //   console.log('Received message : ', msg);
    // })
  }
}
