import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-server',
  standalone: true,
  imports: [],
  templateUrl: './server.component.html',
  styleUrl: './server.component.css'
})
export class ServerComponent {
  @Input('serverElem') element: { type: string; name: string; content: string; } | undefined;

  ngOnInit() {
    console.log(this.element);
  }

}
