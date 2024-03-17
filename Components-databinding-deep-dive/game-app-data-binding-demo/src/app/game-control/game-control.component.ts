import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  standalone: true,
  imports: [],
  templateUrl: './game-control.component.html',
  styleUrl: './game-control.component.scss'
})
export class GameControlComponent {

  @Output() numberIncrement = new EventEmitter<number>();
  intervalCounter!: number;
  intervalRef: any;
  

  ngOnInit() {
    this.intervalCounter = 0;
  }
  
  onStart() {
    console.log("Game started!");
    this.intervalRef = setInterval(() => {
      console.log(this.intervalCounter + 1);
      this.intervalCounter++;
      this.numberIncrement.emit(this.intervalCounter);
    }, 1000)

  }

  onPause() {
    console.log("Game paused!");
    clearInterval(this.intervalRef);
  }

}
