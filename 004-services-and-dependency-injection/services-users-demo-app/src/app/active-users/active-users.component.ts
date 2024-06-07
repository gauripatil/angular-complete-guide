import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-active-users',
  standalone: true,
  imports: [],
  templateUrl: './active-users.component.html',
  styleUrl: './active-users.component.scss',
  // providers: [UsersService]
})
export class ActiveUsersComponent implements OnInit{
  users!: string[];

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.users = this.userService.activeUsers;
    console.log(this.users)
  }

  onSetToInactive(id: number) {
    this.userService.setToInactive(id);
  }
}
