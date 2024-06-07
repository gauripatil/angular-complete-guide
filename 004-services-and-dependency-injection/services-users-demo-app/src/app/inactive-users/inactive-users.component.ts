import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-inactive-users',
  standalone: true,
  imports: [],
  templateUrl: './inactive-users.component.html',
  styleUrl: './inactive-users.component.scss',
  // providers: [UsersService]
})
export class InactiveUsersComponent implements OnInit {
  users!: string[];

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.users = this.userService.inactiveUsers;
    console.log(this.users)
  }

  onSetToActive(id: number) {
    this.userService.setToActive(id);
  }
}
