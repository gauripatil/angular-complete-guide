import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActiveUsersComponent } from './active-users/active-users.component';
import { InactiveUsersComponent } from './inactive-users/inactive-users.component';
import { UsersService } from './users.service';
import { CounterService } from './counter.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ActiveUsersComponent,
    InactiveUsersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [UsersService]
})
export class AppComponent {
  title = 'services-users-demo-app';
}
