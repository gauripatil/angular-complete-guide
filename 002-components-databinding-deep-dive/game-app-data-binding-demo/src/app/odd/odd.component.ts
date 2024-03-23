import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-odd',
  standalone: true,
  imports: [],
  templateUrl: './odd.component.html',
  styleUrl: './odd.component.scss'
})
export class OddComponent {

  @Input()
  number!: number;

}
