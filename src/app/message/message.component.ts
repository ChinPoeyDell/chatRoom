import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { FormControl, Validators } from '@angular/forms';

interface User {
  name: string
  email: string
  chat: Message[]
}

interface Message {
  text: string
  sender: string
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  users: User[];
  messages: Message[];

  commentInput = new FormControl(
    "",
    [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(200),
    ]
  )

  constructor(private service: ChatService) {
   }


  ngOnInit() {
    this.service.users.subscribe(Array => {
      this.users = Array
    })
    this.service.selectedUser.subscribe(idx => {
      this.users = this.service.users[idx]
    })
  }

  sentMessage() {
    const newMessage = this.users.controls.text.value
    this.service.createMessage(newMessage, 'Me')
  }

}