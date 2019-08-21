import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

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
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {

  constructor(private service: ChatService) { }
  users: User[];

  ngOnInit() {
    this.service.users.subscribe(value => {
      this.users = value
    })
  }

  selectedUser(idx: number) {
    this.service.updateSelectedUser(idx)
  }
}
