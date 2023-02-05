import { Component, OnInit } from '@angular/core';
import {io} from 'socket.io-client';
import { Socket } from 'ngx-socket-io';  

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  messageText: string | undefined;
  username: string = 'User' + Math.floor(Math.random() * 100);

  constructor(private socket: Socket) { }

  ngOnInit() {
    // socket = io('http://localhost:3000');

    this.socket.on('new-message', (message: any) => {
      this.messages.push(message);
    });

    this.socket.on('new-connect', () => {
      this.messages.push('New one connected!');
    });
  }

  sendMessage() {
    this.socket.emit('send-message', {
      text: this.messageText,
      username: this.username
    });
    this.messageText = '';
  }
}
