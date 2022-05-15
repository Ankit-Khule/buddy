import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io'; 
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class SocketService {
	constructor(private socket: Socket) { }

	// emit event
	sendMessages(message : any) {
		this.socket.emit('handleMessage',message);
	}

    // listen event
	getNewMessages() {
		return this.socket.emit('handleMessage')
	}

}