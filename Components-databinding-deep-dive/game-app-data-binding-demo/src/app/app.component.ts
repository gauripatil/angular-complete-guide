import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameControlComponent } from './game-control/game-control.component';
import { EvenComponent } from './even/even.component';
import { OddComponent } from './odd/odd.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    GameControlComponent,
    EvenComponent,
    OddComponent,
    RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'game-app-data-binding-demo';
  oddNumbers: number[] = [];
  evenNumbers: number[] = [];

  onIncrement(data: number): void {
    console.log('received data - ' + data);
    if (data % 2 == 0) {
      this.evenNumbers.push(data);
    } else {
      this.oddNumbers.push(data);
    }
  }
}
